import React, { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import classes from "./Nav.module.css";

const Menu = (props) => {
  const token = localStorage.getItem('mascStudetDb');
  const [filterData, setFilterData] = useState([])

  let course
  let batch
  let sem

  const filteredData = () => {
    console.log('in fetch', course, sem, batch);
    if (!course || !sem || !batch) alert('select all the fields')
    
    else {
      fetch('/student/filterStudent', {
        method: 'Put',
        headers: {
          'Content-Type': 'application/json',
          "authorization": token.replace(/['"]+/g, '')
        },
        body: JSON.stringify({
          course,
          batch,
          sem
        })

      }).then(res => res.json()).then(responce => {
        console.log('data', responce);

        if (responce.error) {
          console.log(responce.error);
          alert(responce.error)
        } else {
          props.data(responce)
        }

      })
    }
  }

  const filter = () => {
    fetch('/student/filter', {
      headers: {
        "authorization": token.replace(/['"]+/g, '')
      }
    }).then(res => res.json()).then(responce => {
      console.log(responce);
      setFilterData(responce)
    })

  }

  const [FilterToggle, setFilterToggle] = useState(false)

  const FilterActivation = () => {
    setFilterToggle(true)
    console.log('on');
    filter()
  }

  const FilterDeActivation = () => {
    setFilterToggle(false)
    console.log('off');
  }

  return (
    <div className={classes.Menu}>
      <header className={classes.header}>
        <p className={classes.MainHeader}>MASC Students DB</p>
        <div className={classes.FilterDiv}>
          <button className={classes.Filter} onClick={FilterActivation} >
            <FaFilter size="20px" color="#2d4059" />
          </button>
        </div>
      </header>
      <div className={FilterToggle ? classes.Filtercard : classes.FiltercardDeactive}>
        {/* Exit */}
        <div className={classes.Exit}>
          <button className={classes.FilterClose} onClick={FilterDeActivation} >
            <FaTimes size="20px" color="#2d4059" />
          </button>
        </div>
        
        {/* Form */}

        <div className={classes.Form}>
          <p className={classes.FilterHead}>Filter</p>
        
          <form  className={classes.FilterserchForm}onSubmit={async(e) => {
            //form submition
             //batch
             const suck =async() => {
             batch = e.target[0].value
              //sem
              sem =  e.target[1].value;
              //course
              course = e.target[2].value

              console.log('submited', course);
            }
            e.preventDefault()
            await suck()
           
            filteredData()



          }}>
        
            <label htmlFor="Batch">Batch</label>
            <select name="Batch">
              {
                 filterData.map((single) => {
                  return (
                    <>
                      {

                        single.batch.map((singleBatch, index) => {
                          
                          return (
                          <option key={index}>{singleBatch}</option>
                          )
                        })
                      }

                    </>
                  )
                })
              }

            </select>
            <label htmlFor="Semester">Semester</label>
            <select name="Semester">
              {
                 filterData.map((single) => {
                  return (
                    <>
                      {

                        single.sem.map((singleSem, index) => {
                          
                          return (
                          <option key={index}>{singleSem}</option>
                          )
                        })
                      }

                    </>
                  )
                })
              }
            </select>
            <label htmlFor="Course">Course</label>
            <select name="Course">
              {
                filterData.map((single) => {
                  return (
                    <>
                      {

                        single.course.map((singleCourse, index) => {
                          console.log(singleCourse);
                          return (
                          <option key={index}>{singleCourse}</option>
                          )
                        })
                      }

                    </>
                  )
                })
              }
            </select>
            <input className={classes.FilterSearchSubmit} type="submit" value="Search" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Menu;
