




// firebase code =========================

import { initializeApp } from 'firebase/app'
import {
	 getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, getDoc, updateDoc
} from 'firebase/firestore'

import {
	 signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged,
	setPersistence, inMemoryPersistence, browserLocalPersistence, signOut
} from 'firebase/auth'

const firebaseConfig = {
	apiKey: "AIzaSyCUYvYHSQihoeLona5QxL1lkJJ_LRRpuVI",
	authDomain: "dictionaryxservice.firebaseapp.com",
	projectId: "dictionaryxservice",
	storageBucket: "dictionaryxservice.appspot.com",
	messagingSenderId: "973731173586",
	appId: "1:973731173586:web:187ab32f5eae8db202090b",
	measurementId: "G-5D3C9NW3PG"
 };

 // init firebase app 
initializeApp(firebaseConfig)


// init services 
const db = getFirestore()
const auth = getAuth()
const colRef = collection(db, `suka`)

// =============================

// setPersistence(auth, browserLocalPersistence)
// =============================


// checktest==================
// document.querySelector('.checktest').addEventListener('click', testFunc)
// async function showUserDocs() {
// 	const subColRef = collection(db,'suka', 'lEqoJVQoRYqqio4SUPjm', `${userPersonalCollection}`)
// 	getDocs(subColRef)
// 	.then((snapshot)=>{
// 		let array = []
// 		console.log('snapshot docs' + snapshot.docs)
// 		snapshot.docs.forEach((doc) => {
// 			array.push({...doc.data(), id: doc.id})
// 		})
// 		console.log(array)
// 		if(array.length > 0) {
// 			console.log('yes')
// 			showTexts()
// 		}
// 		else {
// 			addDoc(subColRef, {
// 				user: `${userPersonalCollection}`,
// 				createdAt: serverTimestamp()
// 			})
// 		}
// 	})
// 	}


	async function showTexts() {
		const file = doc(db, "suka", 'lEqoJVQoRYqqio4SUPjm')
	const col = await collection(file, `${auth.currentUser.email}`)
	// console.log('smari ' + auth.currentUser.email)
onSnapshot(col, (snapshot)=>{
	let texts = []
	snapshot.docs.forEach((doc)=>{
		texts.push({
			...doc.data(), id: doc.id
		})
	})
	console.log(texts)
	textField.innerHTML = ''
	texts.forEach((elem)=>{
		cur = textField.innerHTML 
		textField.innerHTML = 
		` 
		 ${cur}
		 <div class="text" data-num = "${elem.id}"> 
		 <div class="text-child" >${elem.text}</div>
		 <div class="text-words"></div>
		 </div> 
		 <br\>`
	})
})
	}

// ============
// let userPersonalCollection = ''
// let i = 1
const user = auth.currentUser;

// function yes () {
// if(user){
// 	const email = user.email;
// 	userPersonalCollection = `${email}`
// 	showTexts()
// 	console.log('email' + email)
// }
// else{
// 	console.log('pizdez')
// }
// }
// yes()


document.querySelector('.popups__button1').addEventListener('click', (e)=>{
	
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

	 alert(user.displayName)
	//  userPersonalCollection = user.email
	//  console.log(userPersonalCollection)
  })
//   .then(()=> {return setPersistence(auth, browserLocalPersistence)})
  .then(()=>{
	showTexts()
	// showUserDocs()
})
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
	 alert(errorMessage)
  });


})


document.querySelector('.popups__button').addEventListener('click', ()=>{
	signOut(auth)
.then(() => {
	console.log('Sign-out successful.')
	textField.innerHTML = ''
 })
 .catch((error) => {
	// An error happened.
 });
}
)


// ==================================



const provider = new GoogleAuthProvider()

// 	setPersistence(auth, browserLocalPersistence)
//   .then(() => {
// 	signInWithPopup(auth, provider)
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });



// ===================== moves personal data from server to screen
  onAuthStateChanged(auth, user => {
	if (user) {
		// console.log('it works')
		// showUserDocs()
		showTexts()
		// userPersonalCollection = user.email
	}
  });
//   ============================================


const textField = document.querySelector('.checked__texts')
let cur 
// ----------------
// const subColRef = collection(db,'suka', 'lEqoJVQoRYqqio4SUPjm', `${userPersonalCollection}`)


async function appearTexts (){
	const file = doc(db, "suka", 'lEqoJVQoRYqqio4SUPjm')
	const col = await collection(file, `${userPersonalCollection}`)
onSnapshot(col, (snapshot)=>{
	let texts = []
	snapshot.docs.forEach((doc)=>{
		texts.push({
			...doc.data(), id: doc.id
		})
	})
	console.log(texts)
	textField.innerHTML = ''
	texts.forEach((elem)=>{
		cur = textField.innerHTML 
		textField.innerHTML = 
		` 
		 ${cur}
		 <div class="text" data-num = "${elem.id}"> 
		 <div class="text-child" >${elem.text}</div>
		 <div class="text-words"></div>
		 </div> 
		 <br\>`
	})
})
}
// ----------------






// add to collection


const addToCol = ()=>{
	const file = doc(db, "suka", 'lEqoJVQoRYqqio4SUPjm')
	const col = collection(file, `${userPersonalCollection}`)
	if (textMemory !== '') {
	addDoc(col, {
		text: textMemory,
		createdAt: serverTimestamp()
	})
	textMemory = ''
}
else {
	addDoc(col, {
		text: textTyped.innerHTML,
		createdAt: serverTimestamp()
	})
	textMemory=''
}
}


// =======================auth

// onAuthStateChanged (auth, (user) => {
// 	// showUserDocs()
// 	// showTexts()
// 	console.log('user status changed:', user)
// })


// app code================================ 

	const text = document.querySelector('#input')
	let textTyped = document.querySelector('.texts__text')
	const addTextButton = document.querySelector('.addtext-button')
	const makelistButton = document.querySelector('.makelist-button')
	const popupText = document.querySelector('.popups__popup-text')
	const translateWindow = document.querySelector('.translate-window')
	const sourceLanguageWrapper = document.querySelector('.source-language__ul')
	const targetLanguageWrapper = document.querySelector('.target-language__ul')
	const translateButton = document.querySelector('.translate-button')
	const saveText = document.querySelector('.savetext-button')

	let textMemory
	let currentWord
let firstLanguage = 'en'
let secondLanguage = 'ru'
let currentResource
let languageOnWork

	let words = ''
	let popupWords = ''
	let pickedWordsList = []
	let sourceOrTarget = ''
	let target = 'target'
	let source = 'source'

	const pickLanguage =  (lang, list, lal)=> (e) => {
		const target = e.target
		const word = target.closest(`.${lang}-language__li`)
		if(word) {
			let lagList = list.querySelectorAll('.colored')
			lagList.forEach((elem)=>{
				elem.classList.remove('colored')
			})
			word.classList.add('colored')
			lal = word.textContent

		}
	}

	targetLanguageWrapper.addEventListener('click', (e)=> {
		const target = e.target
		const word = target.closest(`.target-language__li`)
		if(word) {
			let lagList = targetLanguageWrapper.querySelectorAll('.colored')
			lagList.forEach((elem)=>{
				elem.classList.remove('colored')
			})
			word.classList.add('colored')
			secondLanguage = word.textContent
		}
	}
	) 



	sourceLanguageWrapper.addEventListener('click', (e)=>
		{
			const target = e.target
			const word = target.closest(`.source-language__li`)
			if(word) {
				let lagList = sourceLanguageWrapper.querySelectorAll('.colored')
				lagList.forEach((elem)=>{
					elem.classList.remove('colored')
				})
				word.classList.add('colored')
				firstLanguage = word.textContent
			}
		}
	)
	


	addTextButton.addEventListener('click', ()=> {
		words = ''
		textTyped.innerHTML = ''
		textMemory = text.value
		replaceText ()
		divideText()
		console.log(textMemory)
	})

	saveText.addEventListener('click', ()=> {
		if (userPersonalCollection == '') {
			nonAuthTexts()
		}
		else {
			addToCol()
			appearTexts()
			showTexts()
		}
		
	})

	let numberor 
	let count = 0
	function nonAuthTexts() {
		// textField.innerHTML = ''
		
		let arr = []
		arr.push(textTyped.textContent)
		arr.forEach((elem)=>{
			count = count+1
			numberor = textField.innerHTML
			textField.innerHTML = 
			`
			
			<div class="text" data-num = "${count+1}"> 
			<div class="text-child" >${textTyped.textContent}</div>
			<div class="text-words"></div>
			</div> 
			${numberor}
			<br\>
			`
		})
	
		// numberor = some
		// textField.innerHTML = some
		// numberor = textTyped.textContent
		textTyped.textContent = ''
		
	}

	textTyped.addEventListener('click', singleOut )

makelistButton.addEventListener('click', () => {
	popupWords = ''
	pickedWordsList = []
	makeList() } )

popupText.addEventListener('click', listSingleOut)

function resetOtherLanguages () {
	const listWordsArray = currentResource.querySelectorAll('.word')
	listWordsArray.forEach((elem)=> elem.classList.remove('picked-word'))
}


function replaceText() {
	
	
	let textValue = text.value
	textTyped.textContent = textValue
	text.value = '';
}

function divideText() {
	let content = document.querySelector('.texts__text').textContent
	let textArray = content.split(' ')
		wrappingWords (textArray,textTyped)
}

function wrappingWords (array, textArea) {
	array.forEach((elem) => {
		words += `<span class="word"> ${elem} </span>`
		textArea.innerHTML = words
	}
	)
	}

	function singleOut(e) {
		const target = e.target
		const word = target.closest('.word')
		if(word) {
			word.classList.toggle('colored')
		}
	}

	function makeList() {
		let content = document.querySelectorAll('.word')
		content.forEach((elem)=>{
			if (elem.classList.contains('colored')){
				const i = pickedWordsList.length;
				pickedWordsList[i] = elem.textContent;
			}
		})
		function showNewArray () {
			pickedWordsList.forEach((elem)=>{
				popupWords += `<span class="word"> ${elem} </span> <br>`
				popupText.innerHTML = popupWords
			})
		}
		showNewArray()
	}

	function listSingleOut (e) {
		resetOtherWordsinList ()
		const target = e.target
		const word = target.closest('.word')
		if(word) {
		currentWord = word.textContent
			word.classList.add('picked-word')
			translateRequest ()
			// secondTranslator ()
		}
	}

	async function translateRequest () {
		const res = await fetch("https://translate.argosopentech.com/translate", {
			method: "POST",
			body: JSON.stringify({
				q: `${currentWord}`,
				source: firstLanguage,
				target: secondLanguage
			}),
			headers: { "Content-Type": "application/json" }
		});
		let translateObject = await res.json()
		let translateValue = translateObject.translatedText
		writeTranslateResponse(translateValue)
	};
	function writeTranslateResponse(value) {
		translateWindow.innerHTML = value
	}

	function resetOtherWordsinList () {
		const listWordsArray = popupText.querySelectorAll('.word')
		listWordsArray.forEach((elem)=> elem.classList.remove('picked-word'))
	}


function secondTranslator () {

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '58d3c58ab8msha13044a644a9922p1cefcdjsn43567980948d',
			'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com',
		}
	};
	
	fetch(`https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=${firstLanguage}%7C${secondLanguage}&q=${currentWord}&mt=1&onlyprivate=0&de=a%40b.c`, options)
		.then(response => response.json())
		.then(response => writeTranslateResponse(response.responseData.translatedText))
		.catch(err => console.error(err));
		// Hello%20World!
}

let texto 

translateButton.addEventListener('click', () => {
	texto = popupText.querySelectorAll('.word')
	downloadAsFile(texto)})

function downloadAsFile(data) {
  let a = document.createElement("a");
  let b =''
  data.forEach((elem)=> {
  b += elem.innerHTML + "\r\n"; }
  )
  b = encodeURIComponent(b);
  a.href = "data:text/html," + b;
  a.download = "example.txt";
  a.click();
}



