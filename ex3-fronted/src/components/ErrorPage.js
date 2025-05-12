import Layout from "./Layout";
import React from "react";
import {useNavigate} from "react-router-dom";

function ErrorPage() {
    const navigate = useNavigate();

    return (
        <Layout title={"Error Page"}>
            <p>page not found</p>
            <button className="btn btn-outline-success btn-sm" onClick={()=>navigate("/")}>
                back to home
            </button>

        </Layout>
    )
}

export default ErrorPage;