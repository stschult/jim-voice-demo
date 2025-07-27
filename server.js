const express = require('express');
const twilio = require('twilio');
const app = express();

app.use(express.urlencoded({ extended: true }));

const DEMO_DATA = {
  jim: {
    overallStatus: "You have 6 active audits. 4 are progressing well, but 2 need immediate attention.",
    redFlags: [
      "TechFlow Solutions SOC 2 audit has 3 critical controls overdue by 4 days",
      "RetailMax discovered a significant finding in payment processing controls"
    ]
  }
};

app.post('/voice', (req, res) => {
  console.log('Voice endpoint called');
  const twiml = new twilio.twiml.VoiceResponse();
  
  const voiceSettings = {
    voice: 'Polly.Matthew'
  };
  
  twiml.say(voiceSettings, 'Hi Jim! It\'s been a few days since your last update, so let me give you an overall assessment... followed by the major red flags you need to address.');
  
  twiml.pause({ length: 1.2 });
  
  twiml.say(voiceSettings, 'Overall status: You have 6 active audits. 4 are progressing well, but 2 need immediate attention. TechFlow Solutions is your biggest concern right now.');
  
  twiml.pause({ length: 1.5 });
  
  twiml.say(voiceSettings, 'Red flag one: TechFlow Solutions S-O-C 2 audit has 3 critical controls overdue by 4 days.');
  
  twiml.pause({ length: 1.2 });
  
  twiml.say(voiceSettings, 'Red flag two: RetailMax discovered a significant finding in payment processing controls.');
  
  twiml.pause({ length: 2 });
  
  twiml.say(voiceSettings, 'That covers your priority items for today, Jim. If you need more details on any specific audit... feel free to call back anytime. Focus on TechFlow today, and have a great day!');
  
  twiml.pause({ length: 1 });
  
  twiml.hangup();
  
  res.type('text/xml');
  res.send(twiml.toString());
});

app.get('/health', (req, res) => {
  console.log('Health check called');
  res.json({ status: 'healthy', partner: 'Jim Foley' });
});

app.get('/', (req, res) => {
  console.log('Root endpoint called');
  res.json({ message: 'Jim Foley Voice Demo is running', status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Jim Foley Voice Demo running on port ' + PORT);
  console.log('Server listening on all interfaces (0.0.0.0)');
});
