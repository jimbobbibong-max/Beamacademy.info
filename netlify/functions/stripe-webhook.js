const Stripe = require('stripe');

exports.handler = async (event) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;

  try {
    const sig = event.headers['stripe-signature'];
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return { statusCode: 400, body: 'Webhook Error: ' + err.message };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    console.log('Payment successful for session:', session.id);

    const metadata = session.metadata || {};
    const { parentName, studentName, phone, tier, package: pkg, subjects, discountedPrice, gstAmount, originalPrice } = metadata;
    const email = session.customer_email;
    const amountPaid = session.amount_total / 100;

    // Determine current term based on date
    // December enrolments are typically for Term 1 of the next year
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    let termNum;
    let termYear = year;
    
    if (month === 11) {
      // December - enrolments are for Term 1 next year
      termNum = 1;
      termYear = year + 1;
    } else if (month >= 0 && month <= 2) {
      termNum = 1;
    } else if (month >= 3 && month <= 5) {
      termNum = 2;
    } else if (month >= 6 && month <= 8) {
      termNum = 3;
    } else {
      termNum = 4;
    }
    
    const term = 'Term ' + termNum + ' ' + termYear;

    // Create Notion records if token is set
    if (process.env.NOTION_TOKEN) {
      try {
        // Create enrolled student
        const studentResponse = await fetch('https://api.notion.com/v1/pages', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + process.env.NOTION_TOKEN,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28'
          },
          body: JSON.stringify({
            parent: { database_id: 'df1ad851-f34d-4751-b211-302497c59aeb' },
            properties: {
              'Student Name': { title: [{ text: { content: studentName || 'Unknown' } }] },
              'Year Level': { select: { name: getYearLevel(tier) } },
              'Status': { select: { name: 'Active' } },
              'Payment Status': { select: { name: 'Paid' } },
              'Parent Email': { email: email },
              'Parent Phone': { phone_number: phone }
            }
          })
        });

        const studentData = await studentResponse.json();
        console.log('Created student in Notion:', studentData.id);

        // Create payment record
        const paymentNotes = '5% discount applied. Original: $' + originalPrice + '/wk, Discounted: $' + discountedPrice + '/wk + $' + gstAmount + ' GST. Package: ' + tier + ' ' + pkg + '. Subjects: ' + subjects + '. Paid via website.';
        
        const paymentResponse = await fetch('https://api.notion.com/v1/pages', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + process.env.NOTION_TOKEN,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28'
          },
          body: JSON.stringify({
            parent: { database_id: '59a61b9b-fdac-4d15-ae3c-41a7e305faec' },
            properties: {
              'Name': { title: [{ text: { content: studentName + ' - ' + term + ' Payment' } }] },
              'Amount': { number: amountPaid },
              'Date Received': { date: { start: new Date().toISOString().split('T')[0] } },
              'Payment Method': { select: { name: 'Card' } },
              'Payment Type': { select: { name: 'Term Fee' } },
              'Term': { select: { name: term } },
              'Notes': { rich_text: [{ text: { content: paymentNotes } }] }
            }
          })
        });

        const paymentData = await paymentResponse.json();
        console.log('Created payment in Notion:', paymentData.id);

      } catch (notionError) {
        console.error('Notion error:', notionError);
      }
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};

function getYearLevel(tier) {
  const map = {
    'Junior': 'Year 7',
    'Intermediate': 'Year 9',
    'Senior': 'Year 11'
  };
  return map[tier] || 'Year 9';
}
