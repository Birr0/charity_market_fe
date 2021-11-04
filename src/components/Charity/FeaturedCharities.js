import { Card, Grid, Tooltip, useMediaQuery, Typography } from "@material-ui/core"
import {Link} from "react-router-dom";

export const FeaturedCharities = () => {
    const desktop = useMediaQuery('(min-width:800px)');

    const charities = [
        {
            "charityOrgId": "99249",
            "name": "North Devon Hospice",
            "missionStatement": "North Devon Hospice is a local charity providing specialist care and support to patients and families affected by cancer, or other life-limiting illnesses. We believe in being there for all the family and all our care is provided completely free of charge",
            "website": "",
            "logoImage": {
                "imageUrl": "https://i.ebayimg.com/00/s/Nzc0WDExMDI=/z/DXgAAOSwwQxgiaAn/$_1.PNG?set_id=8800005007"
            },
            "location": {
                "address": {
                    "city": "",
                    "stateOrProvince": "",
                    "postalCode": ""
                }
            },
            "registrationId": "286554"
        },
        {
            "charityOrgId": "15910",
            "name": "The Mare and Foal Sanctuary",
            "missionStatement": "To rescue and provide care for and prevent cruelty and suffering among horses and ponies that are in need of attention by reason of sickness, maltreatment, ill usage or other like causes and to provide temporary or permanent homes for such horses.",
            "website": "",
            "logoImage": {
                "imageUrl": "https://i.ebayimg.com/00/s/NDk5WDY0MA==/z/BOMAAOSwDhhgumeF/$_1.PNG?set_id=8800005007"
            },
            "location": {
                "address": {
                    "city": "",
                    "stateOrProvince": "",
                    "postalCode": ""
                }
            },
            "registrationId": "1141831"
        },
    {
        "charityOrgId": "15915",
        "name": "The People's Dispensary For Sick Animals",
        "missionStatement": "At PDSA, saving, protecting and healing pets is what we’re all about. We are dedicated to improving pet wellbeing in three very special ways – by educating owners, preventing disease and carrying out life-saving operations. Pets are part of the family. Our four-legged friends give unconditional love and are sometimes a person’s only companion. They don’t deserve to suffer through economic and social hardship. They can’t help themselves. But we can – with your help.",
        "website": "",
        "logoImage": {
            "imageUrl": "https://i.ebayimg.com/images/g/Y1EAAOSwKP5gomxq/s-l1600.jpg"
        },
        "location": {
            "address": {
                "city": "",
                "stateOrProvince": "",
                "postalCode": ""
            }
        },
        "registrationId": "208217",
        "featureReason": ""
    },

        {
            "charityOrgId": "137046",
            "name": "DEVELOPMENT AID FROM PEOPLE TO PEOPLE UK",
            "missionStatement": "DAPP UK provides and supports programs of education, training, environmental protection and development worldwide, aimed at the relief of poverty and the development of the poorer populations. We support now a project in Zimbabwe-Farmers Club Gutu and one in India: Academy for Working Children, Rajastan focused on the education of marginalised children and at the protection of the environment. We promote the reuse and recycling of clothes to reduce our carbon foot print and create education.",
            "website": "",
            "logoImage": {
                "imageUrl": "https://i.ebayimg.com/00/s/NTExWDU1NA==/z/pJgAAOSwRRpgMkK~/$_1.JPG?set_id=8800005007"
            },
            "location": {
                "address": {
                    "city": "",
                    "stateOrProvince": "",
                    "postalCode": ""
                }
            },
            "registrationId": "1118290",
            "featureReason": ""
        },
        {
            "charityOrgId": "16156",
            "name": "Sense, The National Deafblind and Rubella Association",
            "missionStatement": "Sense is a national charity that supports people who are deafblind, have sensory impairments or complex needs, to enjoy more independent lives.",
            "website": "",
            "logoImage": {
                "imageUrl": "https://i.ebayimg.com/00/s/MTAwMFgxNjAw/z/JbQAAOSwqu5gumiY/$_1.JPG?set_id=8800005007"
            },
            "location": {
                "address": {
                    "city": "",
                    "stateOrProvince": "",
                    "postalCode": ""
                }
            },
            "registrationId": "289868",
            "featureReason": ""
        },
    ]
    return(
        <Grid container justifyContent="center">
            {charities.map((charity) => {
                return(
                    <Grid item  style={{margin:"5px"}}>
                        <Link to={{pathname: `/charities/${charity.registrationId}`}} style={{textDecoration:"none"}}>
                            <Tooltip title={charity.missionStatement} style={{size:"30px"}}>
                                <Card style={{width:(desktop ? "200px": '300px'), height:(desktop ? "200px": '300px'), alignItems:"center"}}>
                                    
                                    <img src={charity.logoImage.imageUrl} style={{width:(desktop ? "200px" : "100%"), height:(desktop ? "125px": "175px")}} alt=''/>
                                    <hr></hr>
                                    <Typography style={{padding:"10px"}}><b>{charity.name}</b></Typography>
                                </Card>
                            </Tooltip>
                        </Link>
                    </Grid>
                )
            })}
        </Grid>
    )
}