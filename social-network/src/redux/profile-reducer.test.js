import React from 'react'
import profileReducer, { addPostActionCreator } from "./profile-reducer";

let state = {
    postsData: [
        { id: 1, message: 'You are beatiful, you know?' },
        { id: 2, message: 'Nice photo' },
        { id: 3, message: 'How are you?' }
    ],
}

test('length of posts should be incremented', () => {
    // 1. Data
    let action = addPostActionCreator('new post text')    
    // 2. Action
    let newState = profileReducer(state, action)
    // 3. Expectation
    expect(newState.postsData.length).toBe(4)
});
  
test('message of new post should be correct', () => {
    // 1. Data
    let action = addPostActionCreator('new post text')
    // 2. Action
    let newState = profileReducer(state, action)
    // 3. Expectation
    expect(newState.postsData[3].message).toBe('new post text')
});
  
test('after removal length of posts should be decrement', () => {
    // 1. Data
    let action = deletePost(1)
    // 2. Action
    let newState = profileReducer(state, action)
    // 3. Expectation
    //expect(newState.postsData.length).toBe(2)
});
  
