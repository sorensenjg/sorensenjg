---
title: React Alert Dialog
date: '2020-04-28T19:46:28.690Z'
description: >-
  A vestibulum blandit natoque fames curae hac pharetra penatibus nec at
  praesent adipiscing magnis ornare ad parturient ultrices interdum euismod
  suspendisse vestibulum nostra cum volutpat tristique amet. Cubilia adipiscing
  mauris eu ante proin condimentum himenaeos elementum ac et amet magna per at a
  rhoncus urna eu. 
---
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
    