import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_actions'


export default function (TheComponent, option, adminRoute = null){

    // option
    // null: 아무나 출입 가능
    // true: 로그인한 유저만 출입
    // false: 로그인한 유저는 출입 불가

    function AuthenticationCheck(props){
        const dispatch = useDispatch()
        console.log(option)
        useEffect(() => {
            dispatch(auth()).then(response => {
                if(!response.payload.isAuth){
                    if(option) {
                        alert('로그인이 필요합니다')
                        props.history.push('/login')
                    }
                } else {
                    if(adminRoute && !response.payload.isAdmin){
                        alert('접근할 수 없는 페이지입니다')
                        props.history.push('/')
                    } else{
                        if(option === false){
                            alert('이미 로그인 하셨습니다.')
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])

        return (<TheComponent />)
    }

    return AuthenticationCheck
}