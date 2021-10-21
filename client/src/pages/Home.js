import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";


const Home = () => {
        const [listOfPosts, setListOfPost] = useState([])
        let history = useHistory()
        useEffect(() => {
            axios.get("http://localhost:3001/posts").then((response) => {
                setListOfPost(response.data)
            })
        }, [])

        const likeAPost = (postId) => {
            axios.post("http://localhost:3001/likes", {PostId: postId},
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken")
                    }
                }).then((response) => {
                    setListOfPost(listOfPosts.map((post) => {
                            if (post.id === postId) {
                                if (response.data.liked) {
                                    return {...post, Likes: [...post.Likes, 0]}
                                } else {
                                    const likesArray = post.Likes
                                    likesArray.pop()
                                    return {...post, Likes: likesArray}
                                }
                            } else {
                                return post
                            }
                        })
                    )

                }
            )
        }

        return (
            <>
                {listOfPosts.map((value, key) => {
                    return (
                        <div className="post" key={key}>
                            <div className="title">{value.title}</div>
                            <div className="body" onClick={() => {
                                history.push(`/post/${value.id}`)
                            }}>{value.postText}</div>
                            <div className="footer">
                                {value.username}
                                <button onClick={() => {
                                    likeAPost(value.id)
                                }}>Like
                                </button>
                                <label>{value.Likes.length}</label>
                            </div>
                        </div>
                    )
                })}
            </>
        );
    }
;

export default Home;