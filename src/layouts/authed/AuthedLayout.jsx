import React, { useEffect } from "react";
import { useHistory } from 'react-router'
import BaseLayout from "../base/BaseLayout";

export default function AuthedLayout({ children }) {
    const history = useHistory();
    // console.log("Value in Layout")
    useEffect(() => {
        let body = document.getElementsByTagName('body')[0]
        if (history?.location?.pathname == '/travelsearch') {
            body.style.overflowY = "hidden"
        } else {
            body.style.overflowY = "auto"
        }
    }, [history?.location?.pathname])
    return (
        <BaseLayout>
            <div style={{ height: "100%" }}>{children}</div>
        </BaseLayout>
    );
}
