import Layout from "./Layout";
import React from "react";
import {useNavigate} from "react-router-dom";

/**
 * ErrorPage Component - 404 Not Found page
 * 
 * This component displays a user-friendly error page that:
 * - Shows a "page not found" message
 * - Provides navigation back to home
 * - Maintains consistent layout with other pages
 * - Offers clear user guidance
 * 
 * @returns {Element} The rendered ErrorPage component with navigation
 * @constructor
 */
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