import releaseicon from 'assets/img/icons/utils/release-icon.svg'
import userIcon from 'assets/img/icons/utils/user-management-icon.svg'

import ReportBar from 'assets/img/icons/utils/report-bar.svg'

import { getItem } from 'utils/localStorageController'
import ReportHeadIcon from 'assets/img/icons/utils/report.svg'
import FeatherIcon from 'feather-icons-react'

const HelperIconDescription = (id, desc,leftClass = '') => {
    return <span className="tooltipe">
                <FeatherIcon icon="info" className="helper-icon info-icon ml-2" id= {`helper-icon-${id}`}  />
                <span className={`tooltipetext ${leftClass}`}>{desc}</span>
            </span>
}


const DATA_MANAGER = getItem('crr_role') == 'DATA_MANAGER'
const DEVELOPER = getItem('crr_role') == 'DEVELOPER' 
const MODEL_MANAGER = getItem('crr_role')  == 'MODEL_MANAGER'
const TESTER = getItem('crr_role')  == 'TESTER'
const LEAD_DEVELOPER = getItem('crr_role')  == 'LEAD_DEVELOPER'
const ACCOUNT_ADMIN = getItem('crr_role') == 'ACCOUNT_ADMIN'

const appVariables =   
{   
    Dashboard : {
        Header : {
            title : "Dashboard" ,
            icon : releaseicon,
            description : "Get a quick glance of predicted discrepancies here" 
        },
        Charts : {
            PredictionAging : DATA_MANAGER && HelperIconDescription(5, "Count of predictions by aging"),
            UnreviewedPredictions : DATA_MANAGER && HelperIconDescription(6, "Pending predictions from Model"),
            PredictionsOnHold : DATA_MANAGER && HelperIconDescription(7, "Count of predictions put on-hold by Data Manager"),
            TotalPredictions : DATA_MANAGER && HelperIconDescription(8, "Sum of pending predictions, on-hold predictions and total in prediction history"),
            PredictionsByDomain : DATA_MANAGER && HelperIconDescription(9, "Count of predictions by domain"),
            PredictionsByConfidenceScore : DATA_MANAGER &&   HelperIconDescription(10, "Total predictions (including pending and analyzed) by the model")
        }
    },
    UserManagement : {
        Header : {
            title : "User Management",
            icon : userIcon,
            description : "Grant/edit user access within SDQ application "
        }
    },
    AccessTokens : {
        Header : {
            title : "Access Tokens",
            icon : releaseicon,
            description : "Generate access tokens for API authentication to access various modules of SDQ application"
        }
    },
    StudyAssignment : {
        Header : {
            title : "Study Assignment",
            description : "Perform clinical studies assignments to the users within SDQ application"
        }
    },
    StudyRegistration : {
        Header : {
            title : "Study Registration",
            icon : releaseicon,
            description : "Register/edit the clinical studies, enable DQs and MLs along with ML subcat configuration for each study within SDQ application"
        },
        registerProdStudy : {
            helperIcon : {
                AssociatedUATStudyID : HelperIconDescription(1, "select replica study registered at UAT instance to link with PROD study")
            }
        }
    },
    JobManagement : {
        Header : {
            title : "Job Management",
            icon : releaseicon,
            description : "Setup schedule for DQ and ML subcats execution for registered clinical studies"
        }
    } ,
    ReleaseManagement : {
        Header : {
            title : "Release Management",
            icon : releaseicon,
            description : "This module enables to identify the DQs which are present in UAT instance and are ready to push to PROD instance"
        }
    },
    TodoList :{
        Header : {
            title : DATA_MANAGER ? "To do List" : TESTER ? "Test results" : '', 
            icon : releaseicon,
            description : DATA_MANAGER ? 'Perform discrepancy management with help of ML/DQs generated predictions'
            : TESTER ?  'View and analyse the test results generated post successful study DQ execution' : ''
        },
        TodolistTabs : {
            Pending : DATA_MANAGER ? HelperIconDescription(11,'Discrepancies ready for DM Review') : '',
            OnHold : DATA_MANAGER ? HelperIconDescription(12,'Discrepancies put on-hold by DM') : '',
            Negative : DATA_MANAGER ? HelperIconDescription(13,'A "Negative" predicted by the system is a study datapoint that is predicted to NOT be discrepant. These predictions do not continue through the prediction pipeline to be tagged with a Subcategory prediction or Query Text prediction.') : ''
        },
        PredictionHistory : {
            PredictionID : DATA_MANAGER && HelperIconDescription(16,'Unique number assigned to a prediction generated within an individual study','left-50'),
            Sequence : DATA_MANAGER && HelperIconDescription(17,'Number relates to the sequential repeating log forms'),
            Discrepancy : DATA_MANAGER && HelperIconDescription(18,'This indicates that the SDQ model predicts that this is a discrepancy if "Y" and does not predict it is a discrepancy "N"'),
            Subcategory : DATA_MANAGER &&  HelperIconDescription(19,'Data review area with which prediction is related to'),
            QueryText : DATA_MANAGER && HelperIconDescription(20,'Suggested query text to be raised to the site'),
            ConfidenceScore : DATA_MANAGER && HelperIconDescription(21,'It represents the statistical likelihood that the prediction by the model is correct'),
            FeedbacktoSDQModel : DATA_MANAGER && HelperIconDescription (22, 'Toggle buttons give positive feedback to the machine/model when green and negative feedback when red. This will help the prediction accuracy through model re-training.'),
            DecisiontoRaiseQuery : DATA_MANAGER && HelperIconDescription(23, 'Approve = Sends query to EDC, Reject = Does not send to EDC, On Hold = Moves to On Hold to-do list'),
            PredictionComparison : DATA_MANAGER && HelperIconDescription(24, 'Shows the history of the prediction review by showing the original information prior to review and what was changed or not changed after review'),
            Comments : DATA_MANAGER && HelperIconDescription(25, 'Shows the history of comments added analyzing or reviewing the predictions created by SDQ'),
            PredictionSummary : DATA_MANAGER && HelperIconDescription(26,'Shows the summary of prediction in detail.'),
            DynamicPanel : DATA_MANAGER && HelperIconDescription(27,'Shows the dynamic panel with supporting variables to analyse the prediction in detail.')
        }
    },
    PredictionHistory :{
        Header : {
            title : "Prediction History",
            icon : releaseicon,
            description : "Review all approved and rejected predictions"
        }
    },
    Rules : {
        NewDQ : {
            DQName : HelperIconDescription(2,"DQ name contains minimum 5 characters and starts with alphabet. special characters not expected"),
            RelationalDataset : HelperIconDescription(3,"if the DQ logic involves more than one dataset, select relational datasets. You can add relational dataset as per the DQ logic requirements"),
            QueryTarget : HelperIconDescription(4, "This is the field where query will be posted")
        },
        ForApproval : {
            DQName : "Review the test results before approving the study DQs"
        }
    },
    QueryLog : {
        Header : {
            title : "Query Log",
            icon : releaseicon,
            description : "View the status of outbound queries with the help of dashboard and logs"
        }
    },
    Reports : {
        Header : {
            title : "Reports",
            icon : ReportBar ,
            headIcon : ReportHeadIcon,
        },
       TableHeader : {
            GroundTruth : "Ground truth report",
            FeedBack : "Feedback report",
            PredictionSummary : "Prediction summary report",
            GTdescription : "The Ground Truth Report displays the discrepant source clinical data for a selected study, along with the Subcategory manually determined as a training data for the model",
            FBdescription : "The Feedback Report shall display reviewed predictions along with the source clinical data and feedback by the reviewing user.The report may be used by the DM team to determine the accuracy of SDQ's ML models.",
            PSdescription : "The Prediction Summary report shall display predictions generated by the models, along with the clinical data used to make those predictions."
        }
    },
    NewDQ : {
        Header : {
            title : "New DQ",
            icon : releaseicon,
            description : "Create/edit study DQ as per study protocol requirements"
        }
    },
    ForApproval : {
        Header : {
            title : (DATA_MANAGER || LEAD_DEVELOPER) ? "For Approval" : '',
            icon : releaseicon,
            description : DATA_MANAGER ? "Approve/reject study DQ as per study protocol requirements"
            : LEAD_DEVELOPER ? "Approve/reject study functions" : ''
        },
        DQName : {
            iconInfo : DATA_MANAGER ? HelperIconDescription(14, "Review the test results before approving the study DQs") 
                            : DEVELOPER ? HelperIconDescription(15, 'check the boilerplate code and debug as per study DQ decription') : ''
        }
    },
    ActiveDQ :{
        Header : {
            title : ((!ACCOUNT_ADMIN) && (!MODEL_MANAGER)) ? "Active DQ" : '',
            icon :releaseicon,
            description : ((!ACCOUNT_ADMIN) && (!MODEL_MANAGER)) ? "List of active study DQs" : ''
        }
    },
    InactiveDQ :{
        Header : {
            title : ((!ACCOUNT_ADMIN) && (!MODEL_MANAGER)) ? "Inactive DQ" : '',
            icon :releaseicon,
            description : ((!ACCOUNT_ADMIN) && (!MODEL_MANAGER)) ? "List of Inactive study DQs" : ''
        }
    },
    ForDevelopment : {
        Header : {
            title : "For Development",
            icon : releaseicon,
            description : DEVELOPER ? "List of study DQs ready for programming" 
            : TESTER ? "List of study DQs ready for testing" : ''
        }
    },
    AssignToMe : {
        Header: {
            title : (DEVELOPER || TESTER) ? "Assign to me" : '',
            icon : releaseicon,
            description : DEVELOPER ? "List of study DQs in programming" 
            : TESTER ? "List of study DQs in testing" : ''
        },
        DQConfiguration: {
            TargetSectionRefname : HelperIconDescription(26, "Applicable only for inform studies")
        }
    },
    NewFunctions :{
        Header : {
            title : "Study Functions", 
            icon  : releaseicon,
            description : "Create new functions to utilise within complex study DQs "
            
        }
    },
    ActiveFunctions : {
        Header : {
            title : "Active Study Functions",
            icon : releaseicon,
            description : "View list of active study functions ready to utilise in complex study DQs"
        }
    }  
}



export {appVariables}
export default HelperIconDescription

