import React from 'react';
import {NavLink, Route, Routes} from "react-router-dom";

const RouterApp = () => {
    return (
        <div>
            <NavLink to={'/'}>main</NavLink>----
            <NavLink to={'/login'}>login</NavLink>----
            <NavLink to={'/profile'}>profile</NavLink>---
            <NavLink to={'/profile/settings'}>settings</NavLink>---

            <Routes>
                <Route path={'/*'} element={<div>404</div>}/>
                <Route path={'/'} element={<div>main</div>}/>
                <Route path={'/login'} element={<div>login</div>}/>
                <Route path={'/profile/*'} element={(
                    <div>
                        profile
                        <Routes>
                            <Route path={'/settings'} element={<div>settings</div>}/>
                        </Routes>
                    </div>
                )}/>
            </Routes>
        </div>
    );
};

export default RouterApp;