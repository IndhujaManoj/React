import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Select , { components }from 'react-select'
import { Row, Col } from 'reactstrap'
import { setStudyID, getStudyList } from 'reduxStore/slices/study/index'
import { getInstanceList, updateInstanceID } from 'reduxStore/slices/instance'
import UATIcon from '../../assets/img/icons/utils/Instance-icon.svg'
import PRODIcon from '../../assets/img/icons/utils/PROD_Icon.svg'
import './instance.css'

function InstanceSwitching() {
  const dispatch = useDispatch()
  const { list, activeInstanceID, activeInstanceName, load: instanceLoad } = useSelector(
    (state) => state.instance.instance
  )
  let options = list.map((item) => {return {value:item.id, label:item.name, icon: UATIcon}})
  if(options[1]){
    options[1].icon = PRODIcon
  }
  
  const { Option } = components;
  const IconOption = props => (
    <Option {...props}>
      <img
        src={props.data.icon}
        style={{ width: 18, marginRight: 10 }}
        alt={props.data.label}
      />
      {props.data.label}
    </Option>
);
  

  function expandSideBar(){
    if(!document.querySelector('.g-sidenav-show')){
      document.getElementById('burger-icon-wrap').click()
    }
  }
  const customStyles = {
    singleValue: (provided, state) => ({
      ...provided,
      color: '#344563',
      fontWeight: '700',
      fontSize: '14px',
    }),
    menu: (provided, state) => ({
      ...provided,
      width: '124%',
      float: 'right',
      left: '-44px',
    }),
    option: (provided, state) => ({
      ...provided,
      margin: '10px',
      width: '90%',
      borderRadius: '6px',
      backgroundColor:
        state.data === state.selectProps.value ? 'blue' : 'white',
      ':hover': {
        backgroundColor: '#EEF5FF',
      },
      ':select': {
        backgroundColor: 'red',
      },
    }),
  }


  return (
    <div className="instance-container">
      <Row>
        <Col sm="2" className="widget-column" onClick={expandSideBar} >
          <img src={activeInstanceID === '1' ? UATIcon : PRODIcon} width="18px" height="18px" className="icon-widget"/>
        </Col>
        <Col className="instance-column">
          <div className="title">Instance</div>

          <Select
            styles={customStyles}
            components={{
              IndicatorSeparator: () => null,
              Option: IconOption
            }}
            className="instance-dropdown"
            value={{ label: activeInstanceName, value: activeInstanceID }}
            options={options}
            placeholder="select Instance"
            onChange={(e) => {
              dispatch(
                updateInstanceID({
                  instanceName: e.label,
                  instanceId: e.value,
                })
              )
              dispatch(getStudyList({instance_id: e.value}))
              dispatch(
                setStudyID({ study_id: '', id: '', instance_switch: true })
              )
              window.location.href = '/'
             
            }}
            classNamePrefix="instance"
            onFocus={() => {
              if (list.length === 0) {
                dispatch(getInstanceList())
              }
            }}
            isLoading={instanceLoad}
            
          />
        </Col>
      </Row>
    </div>
  )
}

export default InstanceSwitching
