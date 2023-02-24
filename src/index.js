




// firebase code =========================

import { initializeApp } from 'firebase/app'
import {
	 getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, getDoc, updateDoc, QueryLimitConstraint, setDoc, getString
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


	async function showTexts() {
		const file = doc(db, "suka", 'lEqoJVQoRYqqio4SUPjm')
	const col = await collection(file, `${auth.currentUser.email}`)
onSnapshot(col, (snapshot)=>{
	let texts = []
	 snapshot.docs.forEach((doc)=>{
		let x = doc.id
		if(x != 'dictionary') {
			texts.push({
				...doc.data(), id: doc.id
			})
		}
	
	})
	// console.log(texts)
	textField.innerHTML = ''
	texts.forEach((elem)=>{
		if(elem.pickedWords){
		cur = textField.innerHTML 
		textField.innerHTML = 
		` 
		 ${cur}
		 
		 <div class="text" data-num = "${elem.id}"> 
		 <div class="closetext">x</div>
		 <div class="text-child" >${elem.text}</div>
		 <div class="addglobal">add to Dict</div>
		 <div class="text-words">${elem.pickedWords}</div>
		 </div> 
		 <br\>`
		}

		

		else {
			cur = textField.innerHTML 
		textField.innerHTML = 
		` 
		 ${cur}
		 <div class="text" data-num = "${elem.id}"> 
		 <div class="closetext">x</div>
		 <div class="text-child" >${elem.text}</div>
		 <div class="addglobal">add to Dict</div>
		 <div class="text-words"></div>
		 </div> 
		 <br\>`
		}
		
	})
})
	text.value = ''
	async function he () {
		let dicDoc = await doc(col, 'dictionary')
		let gd = await (await getDoc(await doc(col,'dictionary'))).data().dictionary
		let array = gd.split(' ')
		const unique = array.filter((x, i) => array.indexOf(x) === i);
				console.log('unic'+unique);
				// unique.forEach((elem)=>{
				// 		memory = `${memory} ${elem}`
				// 		updateDoc(nuDoc,{dictionary: memory})
				// 	})
				document.querySelector('.global-dictionary').innerHTML = ''
		unique.forEach((elem)=>
		{
			let bas = document.querySelector('.global-dictionary').innerHTML
			document.querySelector('.global-dictionary').innerHTML = `${bas} ${elem} <br\>`
		})
		// document.querySelector('.global-dictionary').innerHTML = gd
	}
	he()
	
	// 
	}

// ============
// let userPersonalCollection = ''
// let i = 1
const user = auth.currentUser;





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



let cur 
// ---------------



// add to collection


const addToCol = ()=>{
	resetOtherWordsinList ()
	const file = doc(db, "suka", 'lEqoJVQoRYqqio4SUPjm')
	const col = collection(file, `${auth.currentUser.email}`)
	textMemory = text.value
	if (textMemory !== '') {
		if(popupText.textContent !== ''){
			text.value = text.value.replace(/(\r\n|\n|\r)/g, '<br/> ')
			textMemory = text.value
			addDoc(col, {
				text: textMemory,
				createdAt: serverTimestamp(),
				pickedWords: popupText.innerHTML
			})
			textMemory = ''
		}
		else {
			text.value = text.value.replace(/(\r\n|\n|\r)/g, '<br/> ')
			textMemory = text.value
			addDoc(col, {
				text: textMemory,
				createdAt: serverTimestamp(),
				pickedWords: ''
			})
			textMemory = ''
		}
	}
	else {
		if(popupText.textContent !== ''){
			text.value = text.value.replace(/(\r\n|\n|\r)/g, '<br/> ')
			textMemory = text.value
			addDoc(col, {
				text: textTyped.innerHTML,
				createdAt: serverTimestamp(),
				pickedWords: popupText.innerHTML
			})
			textMemory=''
		}
		else {
			text.value = text.value.replace(/(\r\n|\n|\r)/g, '<br/> ')
			textMemory = text.value
			addDoc(col, {
				text: textMemory,
				createdAt: serverTimestamp(),
				pickedWords: ''
			})
			textMemory = ''
		}
		
	}
	}


// =======================auth



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
	const textField = document.querySelector('.checked__texts')
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
			// secondLanguage = word.textContent
			secondLanguage = word.dataset.language
			document.querySelector('.target-language__title').textContent = word.textContent
			target.closest('.x').classList.remove('open')
		}
	}
	) 

	const LangButton = document.querySelector('.chooze-language') 
	LangButton.addEventListener('click', (e)=>{
		const target = e.target
		if(target.classList.contains('i')){
			const title = target.closest('.a')
			const list = title.querySelector('.x')
			list.classList.toggle('open')
		}
		
	})



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
				// firstLanguage = word.textContent
				firstLanguage = word.dataset.language
				document.querySelector('.source-language__title').textContent = word.textContent
				target.closest('.x').classList.remove('open')
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
		if (auth.currentUser == null) {
			nonAuthTexts()
			// text.value = ''
		}
		else {
			addToCol()
			showTexts()
			// text.value = ''
		}
		text.value = ''
		console.log("text value: "+ text.value)
		textTyped.innerHTML = ''
		popupText.innerHTML = ''
	})

	let numberor 
	let count = 0

	textField.addEventListener('click', async (e)=>{
		if(e.target.classList.contains('closetext') || e.target.classList.contains('addglobal')) {
			let target = e.target
		let closeText = target.closest('.closetext')
		if(auth.currentUser){
			const colRef = collection(db, 'suka', 'lEqoJVQoRYqqio4SUPjm' , `${auth.currentUser.email}`)
		const docRef = doc(colRef, `${target.closest('.text').dataset.num}`)
		if(target.classList.contains('closetext') ){
			deleteDoc(docRef)
			.then(()=>{
				console.log('document deleted')
			})
		}
		}
		else {
			target.closest('.text').innerHTML=''
		}
		if (target.classList.contains('addglobal')){
			let wordsvalue = target.closest('.text').querySelector('.text-words').textContent
			if(auth.currentUser){
				let memory = ''
				const file = await doc(db, "suka", 'lEqoJVQoRYqqio4SUPjm')
				const col = await collection(file, `${auth.currentUser.email}`)
				const nuDoc = await doc(col,'dictionary')
				// console.log('hueta' + await (await getDoc(await doc(col,'dictionary'))).data().dictionary)
				await updateDoc(nuDoc, {dictionary: await (await getDoc(await doc(col,'dictionary'))).data().dictionary + wordsvalue})
				const dataDoc = await (await getDoc(await doc(col,'dictionary'))).data().dictionary
				// dataDoc()
				console.log(dataDoc)
				let array = dataDoc.split(' ')
				const unique = array.filter((x, i) => array.indexOf(x) === i);
				console.log(unique);
				unique.forEach((elem)=>{
						memory = `${memory} ${elem}`
						updateDoc(nuDoc,{dictionary: memory})
					})
		
				
						
					

				}
			}
		}
		
		showTexts()
		}

	)


	function nonAuthTexts() {
		// textField.innerHTML = ''
		resetOtherWordsinList ()
		let arr = []
		if (textTyped.textContent !== ''){
			arr.push(textTyped.textContent)
		}
		else {
			arr.push(text.value)
		}
		
		arr.forEach((elem)=>{
			count = count+1
			numberor = textField.innerHTML
			if(textTyped.textContent !== '') {
				if (popupText.textContent !== '') {
					textField.innerHTML = 
					`
					<div class="text" data-num = "${count+1}"> 
					<div class="closetext">x</div>
					<div class="text-child" >${textTyped.textContent}</div>
					<div class="addglobal">add to Dict</div>
					<div class="text-words">${popupText.innerHTML}</div>
					</div> 
					${numberor}
					<br\>
					`
				}
				else {
					textField.innerHTML = 
					`
					<div class="text" data-num = "${count+1}"> 
					<div class="closetext">x</div>
					<div class="text-child" >${textTyped.textContent}</div>
					<div class="addglobal">add to Dict</div>
					<div class="text-words"></div>
					</div> 
					${numberor}
					<br\>
					`
				}
			}
			else if (text.value !== '') {
				textField.innerHTML = 
				`
				<div class="text" data-num = "${count+1}"> 
				<div class="closetext">x</div>
				<div class="text-child" >${text.value}</div>
				<div class="addglobal">add to Dict</div>
				<div class="text-words"></div>
				</div> 
				${numberor}
				<br\>
				`
			}
			
			
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

// function resetOtherLanguages () {
// 	const listWordsArray = currentResource.querySelectorAll('.word')
// 	listWordsArray.forEach((elem)=> elem.classList.remove('picked-word'))
// }


function replaceText() {
	
	
	text.value = text.value.replace(/(\r\n|\n|\r)/g, '<br/> ')
	let textValue = text.value
	textTyped.innerHTML = textValue
	text.value = '';
}

function divideText() {
	let content = document.querySelector('.texts__text').innerHTML
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
		let content = textTyped.querySelectorAll('.word')
		content.forEach((elem)=>{
			if (elem.classList.contains('colored')){
				let array = elem.textContent.split(/['.',',']/)
				const i = pickedWordsList.length;
				// pickedWordsList[i] = elem.textContent;
				pickedWordsList[i] = array[0];
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



