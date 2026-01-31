/**
 * Netlify Background Function: submission-created
 *
 * This function is automatically triggered when a form is submitted on the site.
 * It forwards the submission data to the Beam Admin portal's webhook endpoint.
 *
 * Naming convention: "submission-created" is a Netlify event-triggered function name.
 */

const WEBHOOK_URL = 'https://xcoxtxcblelsbdfxmygs.supabase.co/functions/v1/website-form-webhook';

exports.handler = async (event) => {
  console.log('Form submission received');

  try {
    // Parse the submission payload from Netlify
    const payload = JSON.parse(event.body);

    // Extract the form data
    const { form_name, data, id } = payload.payload || payload;

    console.log(`Processing form: ${form_name}, submission ID: ${id}`);

    // Only process the contact form
    if (form_name !== 'contact') {
      console.log(`Skipping non-contact form: ${form_name}`);
      return { statusCode: 200, body: 'Skipped - not a contact form' };
    }

    // Prepare the data for the admin portal
    const webhookData = {
      form_name: form_name,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      'year-level': data['year-level'] || '',
      subjects: data.subjects || [],
      message: data.message || '',
      submission_id: id
    };

    console.log('Sending to admin portal:', JSON.stringify(webhookData));

    // Forward to the admin portal webhook
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });

    const result = await response.text();
    console.log(`Webhook response: ${response.status} - ${result}`);

    if (!response.ok) {
      console.error(`Webhook failed: ${response.status}`);
      return {
        statusCode: 500,
        body: `Webhook failed: ${response.status}`
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Forwarded to admin portal' }),
    };

  } catch (error) {
    console.error('Error processing submission:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
