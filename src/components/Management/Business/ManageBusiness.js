import { ManagementTemplate } from "../ManagementTemplate/ManagementTemplate.js"

export const ManageBusiness = () => {
    return(
        <ManagementTemplate component={
            <div>
                <h1>
                    Manage Business
                </h1>
                <p>Locations</p>
                <p>Organization</p>
                <p>Payments</p>
            </div>
        } />
    ) 
}