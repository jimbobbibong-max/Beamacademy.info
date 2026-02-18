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

    // Process contact and trial forms
    const validForms = ['contact', 'trial', 'chemistry-trial', 'physics-trial', 'maths-trial', 'english-trial', 'free-trial'];
    if (!validForms.includes(form_name) && !form_name.includes('trial')) {
      console.log(`Skipping form: ${form_name}`);
      return { statusCode: 200, body: 'Skipped - not a trial form' };
    }

    // Prepare the data for the admin portal
    // Pass through all field name variants — the webhook handles normalisation
    const webhookData = {
      form_name: form_name,
      // Parent/name fields
      name: data.parentName || data.name || data['parent-name'] || '',
      parentName: data.parentName || data.name || '',
      // Email fields
      email: data.parentEmail || data.email || '',
      parentEmail: data.parentEmail || data.email || '',
      // Phone fields
      phone: data.parentPhone || data.phone || '',
      parentPhone: data.parentPhone || data.phone || '',
      // Student fields
      studentName: data.studentName || data['student-name'] || data.student_name || data['child-name'] || '',
      // Year level
      yearLevel: data.yearLevel || data['year-level'] || data.year_level || '',
      'year-level': data.yearLevel || data['year-level'] || data.year_level || '',
      // Other
      subjects: data.subjects || [],
      message: data.message || '',
      submission_id: id
    };

    console.log('Sending to admin portal:', JSON.stringify(webhookData));

    // Forward to the admin portal webhook
    const webhookSecret = process.env.WEBHOOK_FORM_SECRET;
    if (!webhookSecret) {
      console.error('WEBHOOK_FORM_SECRET not set in environment');
      return { statusCode: 500, body: 'Webhook secret not configured' };
    }

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': webhookSecret,
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
