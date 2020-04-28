---
title: React Alert Dialog
date: '2020-04-28T19:46:28.690Z'
description: ''
---
Uses:

React hooks + context + Promise to provide a reusable dialog.

Example: 

    const YourAwesomeComponent = () => {
      const confirm = useConfirmation()
    
      confirm({
        variant: "danger",
        title: "Are you sure you want to remove this burrito?",
        description: "If you will remove this burrito you will regret it 😡!!"
      }).then(() => {
        api.deleteThisAwfulBurrito();
      });
    }

Source: 

[https://dev.to/dmtrkovalenko/the-neatest-way-to-handle-alert-dialogs-in-react-1aoe](https://dev.to/dmtrkovalenko/the-neatest-way-to-handle-alert-dialogs-in-react-1aoe "https://dev.to/dmtrkovalenko/the-neatest-way-to-handle-alert-dialogs-in-react-1aoe")