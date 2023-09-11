import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BSTable from 'components/Table/index'
import {
  getStudyList,
  setStudyID,
  setModalState,
  makeStudyFavorite,
} from 'reduxStore/slices/study/index'
import { Card, Row, Modal, ModalHeader, ModalBody, Input, Col } from 'sdq-ui'
import { columns } from 'variables/StudyListColumn'
import classNames from 'classnames'

function StudyList() {
  const dispatch = useDispatch()

  const { list, activeStudyID, modalState } = useSelector(
    (state) => state.study.study
  )

  const [search, setSearch] = useState('')

  const study_fav_list_data = list
    .filter((data) => {
      if (search === '') {
        return data
      } else if (
        data.study_id.toLowerCase().includes(search.toLowerCase().trim())
      ) {
        return data
      }
      return null
    })
    .map((data) => {
      return {
        id: data.id,
        fav_study: (
          <span
            className={`favorite ${
              data.is_favorite ? 'fas fa-heart' : 'far fa-heart'
            }`}
          ></span>
        ),
        study_id: data.study_id,
        description: data.description,
        status: data.status,
      }
    })

  const options = {
    onClick: (e, row, rowIndex) => {
      if (e.target.tagName.toLowerCase() == 'span') {
        handleFavoriteStudy(list.find((data) => data.id == row.id))
      } else {
        dispatch(setStudyID({ study_id: row.study_id, id: row.id }))
        window.location.reload(false)
        toggleState()
      }
    },
  }

  function handleFavoriteStudy(data) {
    const value = data.is_favorite ? 0 : 1
    dispatch(makeStudyFavorite({ id: data.id, favorite_value: value }))
  }

  const toggleState = () => {
    dispatch(setModalState(!modalState))
  }

  return (
    <>
      <Modal
        size="lg"
        isOpen={modalState}
        className="study-modal-table"
        toggle={activeStudyID || list.length === 0 ? toggleState : null}
      >
        <ModalHeader
          className={classNames({
            'disable-close-action': !(activeStudyID || list.length === 0),
          })}
          charCode={(activeStudyID || list.length === 0) && 'x'}
          toggle={() => toggleState()}
        >
          <div className="d-flex" style={{ width: '100%' }}>
            <div>Studies</div>
          </div>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg="3">
              <Input
                data-test-id="search-study-data"
                type="search"
                placeholder="Search Study"
                className="study-search mb-3"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
          </Row>
          <div className="text-center">
            <Row>
              <div className="col">
                <Card className="study-list-card">
                  <BSTable
                    total_records={list.length}
                    columns={columns}
                    data={study_fav_list_data}
                    keyField={'id'}
                    options={options}
                  />
                </Card>
              </div>
            </Row>
          </div>
        </ModalBody>
      </Modal>
      <button
        className="btn btn-icon btn-default btn-study mr-4"
        type="button"
        onClick={() => {
          dispatch(setModalState(true))
          dispatch(getStudyList())
        }}
      >
        <span className="btn-inner--text">
          {activeStudyID || 'Select a study'}
        </span>
        <span className="btn-inner--icon">
          <i className="ni ni-bold-down"></i>
        </span>
      </button>
    </>
  )
}

export default StudyList
