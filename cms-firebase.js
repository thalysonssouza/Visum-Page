// Configuração do Firebase
// ATENÇÃO: Substitua pelos valores do seu projeto no Firebase Console
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, getDocs, deleteDoc, updateDoc, query, orderBy, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Provedores de Autenticação
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

// Helper functions para Auth
window.cmsAuth = {
    loginGoogle: async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            await checkAndCreateUser(result.user, 'pending');
            return result.user;
        } catch (error) {
            console.error("Erro Google Login:", error);
            alert("Erro ao logar com Google.");
        }
    },
    loginMicrosoft: async () => {
        try {
            const result = await signInWithPopup(auth, microsoftProvider);
            // Conta Microsoft aprova automaticamente como admin (ou author)
            await checkAndCreateUser(result.user, 'admin');
            return result.user;
        } catch (error) {
            console.error("Erro Microsoft Login:", error);
            alert("Erro ao logar com Microsoft.");
        }
    },
    logout: async () => {
        await signOut(auth);
        window.location.href = "cms-login.html";
    }
};

// Verifica se o usuário existe no DB. Se não, cria.
async function checkAndCreateUser(user, defaultRole) {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
        await setDoc(userRef, {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            role: defaultRole,
            createdAt: new Date().toISOString()
        });
    }
}

// Expõe globalmente
window.auth = auth;
window.db = db;
window.onAuthStateChanged = onAuthStateChanged;
window.doc = doc;
window.getDoc = getDoc;
window.setDoc = setDoc;
window.collection = collection;
window.addDoc = addDoc;
window.getDocs = getDocs;
window.deleteDoc = deleteDoc;
window.updateDoc = updateDoc;
window.query = query;
window.orderBy = orderBy;
window.where = where;
