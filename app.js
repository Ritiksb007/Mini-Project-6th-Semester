// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBYM0tkjdUDSzz7UoJt92jQITLXk4DD8lE",
  authDomain: "stdperformance-bf994.firebaseapp.com",
  projectId: "stdperformance-bf994",
  storageBucket: "stdperformance-bf994.appspot.com",
  messagingSenderId: "990002419810",
  appId: "1:990002419810:web:e61ff22f2e52e7664fd93b",
  measurementId: "G-346DHF7S46"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const signInForm = document.querySelector('.sign-in-form');
const signUpForm = document.querySelector('.sign-up-form');
const container = document.querySelector('.container');

document.querySelector('#sign-up-btn').addEventListener('click', () => {
  container.classList.add('sign-up-mode');
});

document.querySelector('#sign-in-btn').addEventListener('click', () => {
  container.classList.remove('sign-up-mode');
});

signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = signUpForm.querySelector('input[type=email]').value;
  const password = signUpForm.querySelector('input[type=password]').value;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('User signed up:', user);
    alert('You have successfully signed up!');
    signUpForm.reset();
    container.classList.remove('sign-up-mode');
  } catch (error) {
    console.error('Error creating user:', error);
    alert('Error creating user: ' + error.message);
  }
});

signInForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = signInForm.querySelector('input[type=email]').value;
  const password = signInForm.querySelector('input[type=password]').value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('User signed in:', user);
    alert('You have successfully signed in!');
    signInForm.reset();
  } catch (error) {
    console.error('Error signing in:', error);
    alert('Error signing in: ' + error.message);
  }
});
