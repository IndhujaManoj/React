import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Label } from 'reactstrap'
import { Card, CardBody, CardHeader, Modal, Row, Col } from 'sdq-ui'
import FeatherIcon from 'feather-icons-react'
import chevronUpIcon from 'assets/img/icons/utils/fi_chevron-up.svg'
import chevronDownIcon from 'assets/img/icons/utils/fi_chevron-down.svg'
import chevronLeftIcon from 'assets/img/icons/utils/fi_chevron-left.svg'
import chevronRightIcon from 'assets/img/icons/utils/fi-chevron-right.svg'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import './analyse.scss'
import 'react-circular-progressbar/dist/styles.css'
import moment from 'moment'
import {
    getPredictionbyId
  } from 'reduxStore/slices/predictions/services/analyzeThunk'
function PredictionAnalyzeModal({config,setPredictionAnalyzeModalConfig}) { 

    
  const dispatch = useDispatch()

  const [modalState, setModalState] = useState(false)

  const { predictionSummary, predictionFeedbackCorrection } = useSelector(
    (state) => state.predictions.analyze
  )

  const [isSubcatSectionMinimized, setIsSubcatSectionMinimized] =
  useState(false)
  
  const prediction_ids = config.prediction_ids;
  let predictionId = config.predictionId;

  const [predictionNextPrev, setPredictionNextPrev] = useState({
      index: prediction_ids.indexOf(predictionId),
      disabledNext: false,
      disabledPrev: false
  })


  

  const togglePrev = (e) => {
    setPredictionAnalyzeModalConfig({...config,predictionId:prediction_ids[prediction_ids.indexOf(predictionId)-1]})
  }

   const toggleNext = (e) => {
    setPredictionAnalyzeModalConfig({...config,predictionId:prediction_ids[prediction_ids.indexOf(predictionId)+1]})
   }
  

  useEffect(() => { setModalState(config.isShow)},[config.isShow] )

  useEffect(() => {
    dispatch(getPredictionbyId({predictionId}))
    manageNextPrevButtonState();
  }, [predictionId])

  const manageNextPrevButtonState = () => {
    if (prediction_ids.indexOf(predictionId) === 0 && prediction_ids.length === 1 ) {
      setPredictionNextPrev({
        index: prediction_ids.indexOf(predictionId),
        disabledNext: true,
        disabledPrev: true,
      })
      return
    }
      if (!prediction_ids[prediction_ids.indexOf(predictionId) - 1]) {
        setPredictionNextPrev({
          index: prediction_ids.indexOf(predictionId),
          disabledNext: false,
          disabledPrev: true,
        })
      } else if (!prediction_ids[prediction_ids.indexOf(predictionId) + 1]) {
        setPredictionNextPrev({
          index: prediction_ids.indexOf(predictionId),
          disabledNext: true,
          disabledPrev: false,
        })
      } else
        setPredictionNextPrev({
          index: prediction_ids.indexOf(predictionId),
          disabledNext: false,
          disabledPrev: false,
        })
    

   
  }

  let sub_cat_features = Object.entries(
    predictionSummary?.subcat_features ?? {}
  )

  let is_sub_category_features_available =
    sub_cat_features.length > 0 &&
    Object.keys(sub_cat_features[0][1]).length > 0
      ? true
      : false
  

  const toggleState = () => {
    setModalState(!modalState)
    setPredictionAnalyzeModalConfig({
        isShow: false,
        predictionId: null,
        rule_name:null,
        summary:{},
        prediction_ids:[]

    })
  }

  const showHideQueryText = () => {
    const trimmedQueryTextElement =
      document.getElementById('trimmed-query-text')
    const fullQueryTextElement = document.getElementById('full-query-text')
    trimmedQueryTextElement.classList.add('d-none')
    fullQueryTextElement.classList.add('d-block')
  }

  return (
    <> 
      <Modal
        className="prediction-modal"
        size="lg"
        isOpen={modalState}
        toggle={() => toggleState()}
        backdrop="static"
        fade={true}
      >
        <div className="modal-header">
          <h6
            className="modal-title"
            id="modal-prediction-analyse"
          >
            <ul className='list-unstyled top-text'>
                <li>
                    <span className="mr-2 first">{config.rule_name}</span> 
                    <span className="mr-2">|</span> 
                    <span className="mr-2">Test Results</span> 
                    <span className="mr-2">|</span> 
                    <span>Read  Mode</span>
                    
                </li>
            </ul>
            {config.summary?.created_at && <ul className='list-unstyled sub-text'>
                <li>
                    <span className="mr-2">{moment(config.summary.created_at).format('MM/DD/YYYY HH:mm:ss')}</span> 
                    <span className="mr-2">|</span> 
                    <span className="mr-2">Tester Name: {config.summary.first_name + ' ' + config.summary.last_name}</span> 
                    
                </li>
            </ul> }
          </h6>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggleState}
          >
            <span aria-hidden={true} data-test-id="studies-close">×</span>
          </button>
          
        </div>
        <div className="modal-body">
            <Row>
              <Card>

        <CardHeader className="d-flex align-items-center">
        
          <div className="ml-3">
            <h3>{`Prediction ID #${predictionId}`}</h3>
          </div>
          <a href="#" className={`btn prevBtn align-self-end ml-auto ${predictionNextPrev.disabledPrev?'disabled':''}`} role="button" aria-disabled="true">
            <img
              src={chevronLeftIcon}
              className="back-icon"
              onClick={() => togglePrev()}
              alt="go-back-icon"
              title="Go Back"
              data-test-id={`todolist-prediction-analyze-go-back-icon-${predictionId}`}
              height="40px"
            />
          </a>
          <a href="#" className={`btn nextBtn ${predictionNextPrev.disabledNext?'disabled':''}`} role="button" aria-disabled="true">
            <img
              src={chevronRightIcon}
              className="cursor-pointer align-self-end"
              onClick={() => toggleNext()}
              alt="go-back-icon"
              title="Go Back"
              data-test-id={`todolist-prediction-analyze-go-back-icon-${predictionId}`}
              height="40px"
            />
          </a>
        </CardHeader>
        <CardBody>
          <section className="prediction-summary">
            <div className="d-flex align-items-center">
              <h4 className="title">Prediction summary</h4>
              <FeatherIcon icon="info" className="info-icon" />
            </div>
            <div className="prediction-summary_details--row">
              <div className="details-data">
                <Label>Country</Label>
                <span>{predictionSummary?.prediction?.country}</span>
              </div>
              <div className="details-data">
                <Label>Site</Label>
                <span>{predictionSummary?.prediction?.siteid}</span>
              </div>
              <div className="details-data">
                <Label>Subject ID#</Label>
                <span>{predictionSummary?.prediction?.subjectid}</span>
              </div>
              <div className="details-data">
                <Label>Visit</Label>
                <span>{predictionSummary?.prediction?.visitnam}</span>
              </div>
            </div>

            <div className="prediction-summary_details--row">
              <div className="details-data">
                <Label>Form</Label>
                <span>{predictionSummary?.prediction?.formname}</span>
              </div>
              <div className="details-data">
                <Label>Sequence#</Label>
                <span>{predictionSummary?.prediction?.form_ix}</span>
              </div>
              <div className="details-data">
                <Label>Itemset index</Label>
                <span>{predictionSummary?.prediction?.itemset_ix}</span>
              </div>
              <div className="details-data">
                <Label>Discrepency</Label>
                <span>
                  {predictionSummary?.prediction?.discrepancy_presence ? 'Yes': 'No'}
                </span>
              </div>
            </div>

            <div className="prediction-summary_details--row confidence-score">

            <div className="details-data">
                <Label>Subcategory</Label>
                <span>{predictionSummary?.prediction?.sub_category}</span>
              </div>

              <div className="details-data">
                <Label>Query text</Label>
                <span>
                  {predictionSummary?.prediction?.query_text?.length > 84 ? (
                    <>
                      <div id="trimmed-query-text">
                        {predictionSummary?.prediction?.query_text.substr(
                          0,
                          54
                        )}
                        <span
                          className="show-more"
                          onClick={() => showHideQueryText()}
                          data-test-id={`todolist-analyze-show-query-text-${predictionId}`}
                        >
                          ...More{' '}
                          <i
                            className="fa fa-angle-double-right"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </div>
                      <div className="d-none" id="full-query-text">
                        {predictionSummary?.prediction?.query_text}
                      </div>
                    </>
                  ) : (
                    predictionSummary?.prediction?.query_text
                  )}
                </span>
              </div>

              <div className="details-data">
                <Label>Confidence score</Label>
                <span>
                  <div style={{ width: '70px', height: '70px' }}>
                    <CircularProgressbar
                      value={Math.round(
                        (predictionSummary?.prediction?.confidence_score ?? 0) *
                          100
                      )}
                      text={`${Math.round(
                        (predictionSummary?.prediction?.confidence_score ?? 0) *
                          100
                      )}%`}
                      strokeWidth={5}
                      styles={buildStyles({
                        pathColor: '#00875A',
                        textColor: 'black',
                      })}
                    ></CircularProgressbar>
                  </div>
                </span>
              </div>

            </div>

            {/* <div className="prediction-summary_details--row feedback">
                <h6 style={{width:'100%'}}>SDQ model feedback</h6>
                <Row>
                    <Col className="col-auto">
                      <span>Discrepancy</span>
                    </Col>
                    <Col className="col-auto">
                        <span>Sub category</span>
                    </Col>
                    <Col className="col-auto">
                        <span>Query text</span>
                    </Col>
                </Row>
            </div> */}
            <div className="prediction-summary_details--row">
              <div className="details-data">
                <Label>Item name</Label>
                <span className='description'>{predictionSummary?.prediction?.question}</span>
              </div>

              <div className="details-data">
                <Label>Item label</Label>
                <span className='description'>{predictionSummary?.prediction?.question_text}</span>
              </div>
            </div>
          </section>

          {is_sub_category_features_available && (
            <section className="subcat_features-section mt-4">
              {sub_cat_features.map((sub_cat) => {
                return (
                  <div className="subcategory" key={sub_cat}>
                    <div className="d-flex align-items-center">
                      <h4>{sub_cat[0]}</h4>{' '}
                      <FeatherIcon icon="info" className="info-icon" />
                      <img
                        src={
                          isSubcatSectionMinimized
                            ? chevronDownIcon
                            : chevronUpIcon
                        }
                        className="back-icon ml-auto"
                        onClick={() =>
                          setIsSubcatSectionMinimized(
                            (isSubcatSectionMinimized) =>
                              !isSubcatSectionMinimized
                          )
                        }
                        alt="minimize-up-down-icon"
                        data-test-id="todolist-analyze-toggle-subcat-info"
                      />
                    </div>
                    {Object.entries(sub_cat[1]).map((domain) => {
                      if (domain[1].length > 0) {
                        return (
                          <div
                            className={`single-subcategory ${
                              isSubcatSectionMinimized ? 'hidden' : ''
                            }`}
                            key={domain}
                          >
                            <h5>{domain[0]}</h5>
                            <div className="subcategory-details">
                              {Object.keys(domain[1][0])
                                .map((property, index) => {
                                  return (
                                    <div
                                      className="details-data"
                                      key={`${property}-${index}`}
                                    >
                                      <Label className="column-name">
                                        {property}
                                      </Label>
                                      <span>
                                        {domain[1][0][property] || '-'}
                                      </span>
                                    </div>
                                  )
                                })}
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>
                )
              })}
            </section>
          )}

          {predictionSummary?.prediction ? (
            <section className="ml-feedback-section">
              <h4 className="title">
                ML Discrepency prediction{' '}
                <FeatherIcon icon="info" className="info-icon" />
              </h4>
              <div className="feedback-container">
                {predictionSummary?.prediction ? (
                  <div className="original-feedback feedback-row">
                    {Object.keys(predictionSummary?.feedback).length !== 0 ? (
                      <span className="original chip">Original</span>
                    ) : (
                      false
                    )}
                    <div className="fields-container">
                      <div className="discrepancy-field field-holder">
                        <span className="label">Discrepancy</span>
                        <span className="value">
                          {predictionSummary.prediction.discrepancy_presence
                            ? 'Yes'
                            : 'No'}
                        </span>
                      </div>
                      <div className="subcategory-field field-holder">
                        <span className="label">Subcategory</span>
                        <span className="value">
                          {predictionSummary.prediction.sub_category || '--'}
                        </span>
                      </div>
                      <div className="query-field field-holder">
                        <span className="label">Query text</span>
                        <span className="value">
                          {predictionSummary.prediction.query_text || '--'}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  false
                )}
                <div className="current-feedback feedback-row">
                  {Object.keys(predictionSummary?.feedback).length !== 0 ? (
                    <>
                      <span className="current chip">ML Feedback</span>
                      <div className="fields-container">
                        <div className="discrepancy-field field-holder">
                          <span className="label">Discrepancy</span>
                          <span className="value">
                              {predictionSummary.feedback?.fb_disc_flag
                                ? 'Yes'
                                : 'No'}
                            </span>
                        </div>
                        <div className="subcategory-field field-holder">
                          <span className="label">Subcategory</span>
                          <span className="value">
                              {predictionSummary.feedback?.fb_subcat_corr ||
                                '--'}
                            </span>
                        </div>
                        <div className="query-field field-holder">
                          <span className="label">Query text</span>
                          <span className="value">
                              {predictionSummary.feedback?.fb_qrytxt_corr ||
                                '--'}
                            </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    false
                  )}
                </div>
              </div>
            </section>
          ) : (
            false
          )}
        </CardBody>

      
      </Card>
            </Row>
        </div>
      </Modal>
    </>
  )
}

export default PredictionAnalyzeModal
