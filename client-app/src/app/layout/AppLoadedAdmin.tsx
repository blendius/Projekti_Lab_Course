import React, { useState } from 'react'
import { useEffect } from 'react';
import { useStore } from '../stores/store';

const { commonStore, adminStore } = useStore();


function handleAdmin() {
    useEffect(() => {
        if (commonStore.token) {
            adminStore.getUser()
        }

    }, [commonStore, adminStore])
}

export default function AppLoadedAdmin() {
    return (

        handleAdmin()

    )
}