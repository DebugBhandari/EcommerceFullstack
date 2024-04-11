module.exports = {
    apps : [{
      name   : 'app1',
      script : 'npm -- run watch',
    env_production: {
      GOOGLE_CLIENT_ID : '701388926312-pd0te09anv6p15h6q8soj9uk9h7tb1e0.apps.googleusercontent.com',
      MONGODB_URI : 'mongodb+srv://deepak:deepak@cluster0.e5jfp.mongodb.net/IntegrifyFull?retryWrites=true&w=majority',
      JWT_SECRET : 'ashdfjhasdlkjfhalksdjhflak',
      SESSION_SECRET : 'ashdfjhasdlkjfhalksdjhflak',
      NODE_ENV : 'production',
            PORT: 5000,
            BASE_URL : 'https://ecom.debugbhandari.link'
  }  }]
  }
  