---
title: "Learning Firebase philosophy"
description: "Why is Firebase used in many applications?
When to use it?
How to use it?
This article offers what I have learned to answer the above questions.
There is also a hands-on session to create a simple web application.
We will also learn about testing and ecosystems so that we can use it more practically."
topics: ["Firebase"]
published: false
eyecatch: "images/firebase-logo-in-the-sky.webp"
date: "2022-10-09T12:09:08.164+09:00"
---

Why is Firebase used in many applications?
When to use it?
How to use it?

This article offers what I have learned to answer the above questions.
There is also a hands-on session to create a simple web application with Firebase.
We will also learn about testing and ecosystems so that we can use it more practically.

# Table of Contents

# なぜ Firebase を学ぶのか

# なぜ Firebase を使うのか

インフラを管理することなくWebアプリを構築できる。

Backend-as-a-Service (BaaS)

バックエンドを外部委託し、フロントエンドの開発ですむ。

認証、DB管理、リモート更新、プッシュ通知、クラウドストレージ、ホスティング

Backend = Firebase Project

# When to use Firebase

# Other BaaS

> Backend-as-a-Service (BaaS) is a cloud service model in which developers outsource all the behind-the-scenes aspects of a web or mobile application so that they only have to write and maintain the frontend.
>
> https://www.cloudflare.com/learning/serverless/glossary/backend-as-a-service-baas/

Supabase, RDBMS data source.

# Example: A simple chat powered by Firebase and Next.js

For a practice, let's create a simple chat app using Next.js and Firebase.
Only authenticated users can write comments.
To handle authentication, we use Firebase Authentication. All comments are stored in Firestore Database.

![app overview](/images/firebase-simple-chat-app.webp)

## Step 1: Setup

First, create a Firebase project and register your web application from Firebase console.

Next, create a new Next.js app and install Firebase SDK in your local machine.

```bash
# https://nextjs.org/docs/getting-started
npx create-next-app@latest --typescript
npm install firebase
```

The versions of the libraries are as follows.

- firebase: 9.11.0
- next: 12.3.1
- react: 18.2.0
- react-dom: 18.2.0

Finally, create a setting file to use Firebase.

`firebase/init.ts`

```typescript
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // Copy from Firebase console
};

initializeApp(firebaseConfig);
```

After you initialize a Firebase App object, you can start using Firebase services.

## Step 2: Authentication

Firebase Authentication を使う。
認証済みユーザーの情報を取得できるようにする。

We should enable Google as a sign-in method in the Firebase console.

`onAuthStateChanged` を使って認証済みユーザーの情報を取得できるようにする。

`hooks/use-auth.ts`

```typescript
import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAuth(): [User | undefined, boolean] {
  const auth = getAuth();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          setUser(user);
        } else {
          setUser(undefined);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    });
  }, []);

  return [user, isLoading];
}
```

The `isLoading` property is useful for updating the sign-in UI.

`contexts/user-context.tsx`

```jsx
import type { User } from "@firebase/auth";
import { createContext, ReactNode } from "react";
import { useAuth } from "../hooks/use-auth";
import "../firebase/init"; // Initialize Firebase application

type ProviderProps = {
  user?: User;
  loading: boolean;
};

export const UserContext = createContext<ProviderProps>({ loading: true });

type UserProviderProps = {
  children?: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [user, loading] = useAuth();

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}
```

Using context, we can access users' information from any components.

`pages/_app.tsx`

```jsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../contexts/user-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
```

To get a user's information, create the useful custom hook.

`hooks/use-user.ts`

```typescript
import { useContext } from "react";
import { UserContext } from "../contexts/user-context";

export const useUser = () => useContext(UserContext);
```

`components/auth-button.tsx`

```jsx
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
} from "@firebase/auth";
import { useUser } from "../hooks/use-user";

export const AuthButton = () => {
  const { user, loading } = useUser();
  const auth = getAuth();

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const handleSignOut = () => {
    signOut(auth);
  };

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (user) {
    return (
      <div>
        <span>Hi, {user.displayName} </span>
        <button onClick={handleSignOut}>SIGN OUT</button>
      </div>
    );
  }
  return (
    <div>
      <span>Please sign in to leave a comment </span>
      <button onClick={handleSignIn}>SIGN IN</button>
    </div>
  );
};
```

## Step 3: Send a comment

What we do in this step are the following.

- write to Firestore
- read from Firestore
- authorize user access permission
- validate data

`firebase/comment.ts`

```typescript
import {
  getFirestore,
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";

export type Comment = {
  id: string;
  text: string;
  userId: string;
  createdAt: Timestamp;
};

export async function addComment(text: string, userId: string) {
  const db = getFirestore();

  await addDoc(collection(db, "comments"), {
    text,
    userId,
    createdAt: Timestamp.fromDate(new Date()),
  });
}
```

`components/comment-form.tsx`

```jsx
import { useState } from "react";
import { addComment } from "../firebase/comment";
import { useUser } from "../hooks/use-user";

export const CommentForm = () => {
  const [commentText, setCommentText] = useState("");
  const { user, loading } = useUser();

  if (loading) return null;
  if (!user) return null;

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.currentTarget.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (commentText.length === 0) return false;
    if (loading) return false;
    if (!user?.uid) return false;

    addComment(commentText, user.uid);
    setCommentText("");

    // Avoid redirect.
    return false;
  };

  return (
    <form>
      <label htmlFor="comment-form">Leave a comment: </label>
      <input
        id="comment-form"
        value={commentText}
        onChange={(event) => handleInput(event)}
      />
      <button type="submit" onClick={(event) => handleSubmit(event)}>
        Send
      </button>
    </form>
  );
};
```

`components/comments-list.tsx`

```jsx
import React, { useEffect, useState } from "react";
import type { Comment as CommentType } from "../firebase/comment";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export const CommentsList = () => {
  const [comments, setComments] = useState<CommentType[]>();

  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snaps) => {
      const newComments: CommentType[] = [];
      snaps.forEach((doc) => {
        newComments.push({
          id: doc.id,
          text: doc.data().text,
          userId: doc.data().userId,
          createdAt: doc.data().createdAt,
        });
      });

      setComments(newComments);
    });
  }, []);

  if (comments === undefined) return <p>Now loading comments...</p>;
  if (comments.length === 0) return <p>There is no comments.</p>;

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};
```

`pages/index.tsx`

```jsx
import type { NextPage } from "next";
import { CommentsList } from "../components/comments-list";
import { AuthButton } from "../components/auth-button";
import { CommentForm } from "../components/comment-form";

const Home: NextPage = () => {
  return (
    <div className="container">
      <div>
        <AuthButton />
        <h2>Discussion</h2>
        <CommentForm />
        <CommentsList />
      </div>
    </div>
  );
};

export default Home;
```

These are security rules.
We can verify that anyone attempting to write to the document has a matching Authentication UID.

```javascript
rules_version = '2';
service cloud.firestore {
  function isValidComment(comment) {
    return comment.size() == 3
     && "text" in comment
     && "createdAt" in comment
     && "userId" in comment
     && comment.text is string
     && comment.text.size() > 0
     && comment.createdAt is timestamp
     && request.auth.uid == comment.userId;
  }

  match /databases/{database}/documents {
    match /comments/{commentId} {
      allow read;
      allow create: if isValidComment(request.resource.data);
    }
  }
}
```

## References

1. https://github.com/vercel/next.js/tree/v12.3.2-canary.25/examples/with-firebase
2. https://firebase.google.com/codelabs/firebase-get-to-know-web

# FirebaseUI

FirebasAuth の上に構築済みの UI を提供するライブラリ。

# Firebase Authentication

ユーザーの認証に使えるライブラリ群。
ユーザーから取得した認証情報を Firebase Authentication に渡すと、Google のバックエンドサービスで認証情報が検証され、クライアントにレスポンスが返ります。
セキュリティルールで認証済みユーザーだけにアクセスさせることもできる。


# Emulator

run in local

```bash
firebase --version
firebase login
firebase use $YOUR_PROJECT_ID
```

```bash
firebase emulators:start --import=./seed
```

# APIs

`onSnapshot`

クエリに一致するドキュメントに変更があった場合、コールバック関数が呼び出される。

# Tips

RSVP ボタン
StackBlitz

Rules を git 管理するには
すきーまを管理するには
スキーマの型を利用するには
初期データをいれるには


https://firebase.google.com/codelabs/firebase-get-to-know-web#0
Firebase で簡単なログイン機能・チャット機能を作る


[Firebase ウェブ Codelab](https://firebase.google.com/codelabs/firebase-web?hl=ja#0)

# Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /guestbook/{entry} {
      allow read: if request.auth.uid != null;
      allow create: if request.auth.uid == request.resource.data.userId
       && "name" in request.resource.data
       && "text" in request.resource.data
       && "timestamp" in request.resource.data;
    }
    match /attendees/{userId} {
      allow read: if true;
      allow write: if request.auth.uid == userId
        && "attending" in request.resource.data;
    }
  }
}
```

# Logging

# Security

# Ecosystems

typesaurus

https://github.com/kossnocorp/typesaurus
