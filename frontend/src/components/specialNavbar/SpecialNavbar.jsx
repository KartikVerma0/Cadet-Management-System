import "./SpecialNavbar.css";
import Model from "../modelComponent/Model";
import permissionsMapping from "../../permissionsMapping";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SpecialNavbar() {
    const [selectedButton, setSelectedButton] = useState("");
    const { auth } = useAuth();
    const permissions = auth.permissions;
    const location = useLocation(); // Get current location for active link styling

    const handleButtonClick = (data) => {
        setSelectedButton(data);
    };

    const hasPermission = (permission) => permissions.includes(permission);

    const renderButton = (permission, label, path) => (
        hasPermission(permission) ? (
            <button onClick={() => handleButtonClick(path)}>
                {label}
            </button>
        ) : null
    );

    const renderLink = (permission, label, path) => (
        hasPermission(permission) ? (
            <Link to={path} className={location.pathname === path ? "active" : ""}>
                {label}
            </Link>
        ) : null
    );

    return (
        <>
            {auth.role !== "PROBATION" && permissions.length > 0 && (
                <>
                    <section className="SpecialNavbar">
                        {renderButton(permissionsMapping.canCreateEvent, "Create an Event", "Event")}
                        {renderButton(permissionsMapping.canCreatePoll, "Create a Poll", "Poll")}
                        {renderButton(permissionsMapping.canCreateNotification, "Create a Notification", "Notification")}
                        {renderButton(permissionsMapping.canUploadStudyMaterial, "Upload Study Material", "Study_Material")}
                        {renderLink(permissionsMapping.canSeeEnrolledCadets, "Enrolled Cadets", "/enrolled/cadets")}
                        {renderLink(permissionsMapping.canSeeProbationCadets, "Probation Cadets", "/enrolled/probation")}
                        {renderLink(permissionsMapping.canApprovePendingExcuses, "Pending Excuses", "/pendingexcuses")}
                        {hasPermission(permissionsMapping.canAuthorizeWingSenior) ||
                            hasPermission(permissionsMapping.canAuthorizeProbationSenior) ? (
                            <Link to="/authorize">Authorize Cadets</Link>
                        ) : null}
                        {renderLink(permissionsMapping.canApproveCadetAccounts, "Approve Cadet Account", "/approveAccounts")}
                    </section>
                    {selectedButton !== "" && <Model closeButtonHandler={setSelectedButton} topic={selectedButton} />}
                </>
            )}
        </>
    );
}
