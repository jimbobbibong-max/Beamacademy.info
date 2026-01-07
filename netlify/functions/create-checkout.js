const Stripe = require('stripe');

exports.handler = async (event) => {
  console.log('=== CREATE-CHECKOUT FUNCTION START ===');
  console.log('HTTP Method:', event.httpMethod);
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY not configured');
    return { statusCode: 500, body: JSON.stringify({ error: 'Payment system not configured' }) };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    console.log('Request body:', event.body);
    const { tier, package: pkg, subjects, parentName, studentName, email, phone } = JSON.parse(event.body);
    console.log('Parsed data:', { tier, pkg, subjects, parentName, studentName, email, phone });

    // Price map (weekly prices in dollars, GST-exclusive)
    const weeklyPriceMap = {
      'Junior-1 Subject': 80,
      'Junior-2 Subjects': 140,
      'Junior-3 Subjects': 200,
      'Intermediate-1 Subject': 100,
      'Intermediate-2 Subjects': 175,
      'Intermediate-3 Subjects': 250,
      'Intermediate-4 Subjects': 300,
      'Intermediate-All Access': 400,
      'Senior-1 Subject': 120,
      'Senior-2 Subjects': 210,
      'Senior-3 Subjects': 300,
      'Senior-4 Subjects': 360,
      'Senior-All Access': 500
    };

    const WEEKS_PER_TERM = 10;

    const key = tier + '-' + pkg;
    console.log('Looking up price for key:', key);
    const weeklyPrice = weeklyPriceMap[key];
    const basePrice = weeklyPrice * WEEKS_PER_TERM;

    if (!basePrice) {
      console.error('Invalid package key:', key);
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid package: ' + key }) };
    }

    // Apply 5% discount
    const discountedPrice = Math.round(basePrice * 0.95);
    // Add 10% GST
    const gstAmount = Math.round(discountedPrice * 0.10);
    const totalPrice = discountedPrice + gstAmount;
    const amountInCents = totalPrice * 100;
    
    console.log('Pricing:', { basePrice, discountedPrice, gstAmount, totalPrice, amountInCents });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: 'BEAM Academy - ' + tier + ' ' + pkg,
              description: 'Term tuition (10 weeks) for: ' + (subjects.length > 0 ? subjects.join(', ') : 'All subjects'),
            },
            unit_amount: Math.round(discountedPrice * 100),
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: 'GST (10%)',
              description: 'Goods and Services Tax',
            },
            unit_amount: Math.round(gstAmount * 100),
          },
          quantity: 1,
        }
      ],
      mode: 'payment',
      success_url: 'https://beamacademy.info/thank-you.html?payment=success&session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://beamacademy.info/#contact',
      customer_email: email,
      metadata: {
        parentName,
        studentName,
        phone,
        tier,
        package: pkg,
        subjects: subjects.join(', '),
        originalPrice: basePrice.toString(),
        discountedPrice: discountedPrice.toString(),
        gstAmount: gstAmount.toString(),
        totalPrice: totalPrice.toString()
      }
    });

    console.log('Checkout session created:', session.id);
    console.log('Checkout URL:', session.url);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: session.url })
    };
  } catch (error) {
    console.error('Stripe error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
