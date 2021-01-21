import React, { useRef, useState, useEffect } from 'react'
import classes from './EditStudent.module.css'
import { FaPen } from "react-icons/fa";
import { cloud } from '../StudentAdd/key'
import { useParams } from 'react-router-dom'
const StudentEditForm = () => {
  const { id } = useParams()
  const [editIco, setEditIco] = useState(false)

  let pic
  const [bValue, setBValue] = useState('Submit');
  const [admno, setAdmno] = useState('')



  //form data
  const [lName, setLname] = useState('');
  const [fName, setFname] = useState('')
  const [mob1, setMob1] = useState('');
  const [mob2, setMob2] = useState('');
  const [dob, setDob] = useState('')
  const [sex, setSex] = useState('')
  const [blood,setBlood] = useState('')
  let bloodGroup;
  let admissionSecured;
  const [nameOfGuardian, setNameofGurdian] = useState('');
  //address
  const [homeName, setHomename] = useState('');
  const [pincode, setPincode] = useState('');
  const [post, setPost] = useState('');
  const [city, setCity] = useState('');

  const [relationGuardin, setRelationGuardin] = useState('');
  const [occupationOfGuardian, setOccuptinofGurdian] = useState('');
  const [ageOfGuardian, setAgeOfGuardian] = useState('')
  let course
  let sem
  const [batch,setBatch] = useState('')
  const [sslc, setSslc] = useState('');
  const [email, setEmail] = useState('');
  const [hss, setHss] = useState('');
  const [etcActivity, setEtcActivity] = useState([])
  let etc = []
  let residence
  const [religion, setReligion] = useState('');
  const [cast, setCast] = useState('');
  const [prevShool, setPrevshool] = useState('');

  const [live, setLive] = useState('');
  const [responsibleGuardianName, setResponsibleGuardianName] = useState('');
  const [responsibleGuardianAge, setResponsibleGuardianAge] = useState('');
  const [responsibleGuardianMob, setResponsibleGuardianMob] = useState('');
  const [responsibleGuardianRelation, setResponsibleGuardianRelation] = useState('');
  const [responsibleGuardianOccupation, setresponsibleGuardianOccupation] = useState('');
  const [specialAchiev, setSpecialAchiev] = useState('');
  const [maritalStatus, setMaritalStatus] = useState(Boolean);
  const [specialProblem, setSpecialProblem] = useState('');
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [prevCourse, setPrevCourse] = useState('')

  const Edit = () => {
    setEditIco(!editIco)
  }

  const token = localStorage.getItem('mascStudetDb');

  const postData = () => {
    if (pic) {

      console.log(bloodGroup);
      console.log(admissionSecured);
      fetch('student/editstudent', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          "authorization": token.replace(/['"]+/g, '')
        },
        body: JSON.stringify({
          lName,
          fName,
          course,
          sex,
          sem,
          mob1,
          mob2,
          bloodGroup,
          dob,
          nameOfGuardian,
          occupationOfGuardian,
          batch,
          sslc,
          pic,
          homeName,
          pincode,
          post,
          city,
          relationGuardin,
          religion,
          prevShool,
          residence,
          responsibleGuardianName,
          responsibleGuardianAge,
          responsibleGuardianMob,
          responsibleGuardianRelation,
          ageOfGuardian,
          hss,
          etcActivity,
          cast,
          responsibleGuardianOccupation,
          specialAchiev,
          maritalStatus,
          specialProblem,
          prevCourse,
          admissionSecured,
          email,
        })
      }).then(res => res.json()).then(responce => {
        if (responce.error) alert(responce.error)

        else {
          console.log(responce);
          alert('student added sucessfuly');
          setBValue('Submit')
          setFname('');
          setLname('');
          setImage({});
          setHomename('');
          setPost('');
          pic = ''
          setPincode('');
          setCity('');
          setEmail('');
          setCity('');
          setMob1('');
          setMob2('');
          setDob('')

        }
      }).catch(e => {
        console.log(e);
      })
    } else {
      alert('select a photo')
    }
  }
  const postPic = () => {
    setBValue('Uploading...')
    //formdata object ||Currently its empty and more clarification go and read mozila doc you will understand much more about Formdata()
    console.log('in upload', image.imageUrl);
    const data = new FormData()

    //append the image with key value pair image is above const image 
    data.append('file', image.imageUrl)

    //put name of cloud upload/project name read cloudinary docs
    data.append('upload_preset', cloud.uploadPreset);

    //put name of cloud 
    data.append('cloud_name', cloud.cloudName)

    //cloud base api insted fetch you can use axios like 3rd party libary
    fetch(cloud.fetch, {
      method: "post",
      body: data
    }).then(res => res.json()).then(data => {
      console.log(data);
      pic = data.secure_url;
      if (pic) {
        postData()
      }


    }).catch(e => {
      console.log('error in upload', e)
      alert('something went wrong plz connect internet')
    })
  }

  useEffect(() => {
    console.log(id);
    fetch(`/profile/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        "authorization": token.replace(/['"]+/g, '')
      }

    }).then(res => res.json()).then(responce => {
      console.log(responce);
      setFname(responce.fName);
      setLname(responce.lName);
      setNameofGurdian(responce.nameOfGuardian);
      setHomename(responce.addressOfGuardian.homeName);
      setPost(responce.addressOfGuardian.post);
      setCity(responce.addressOfGuardian.city);
      setPincode(responce.addressOfGuardian.pincode);
      setMob1(responce.mob1);
      setMob2(responce.mob2);
      setDob(responce.dob);
      setSex(responce.sex)
      setBlood(responce.bloodGroup)
      setLive(responce.residence);
      setRelationGuardin(responce.relationGuardin)
      setOccuptinofGurdian(responce.occupationOfGuardian)
      setReligion(responce.religion);
      setCast(responce.cast);
      setEmail(responce.email);
      setSpecialProblem(responce.specialProblem);
      setResponsibleGuardianName(responce.responsibleGuardian.name);
      setResponsibleGuardianRelation(responce.responsibleGuardian.relation);
      setResponsibleGuardianAge(responce.responsibleGuardian.age);
      setResponsibleGuardianMob(responce.responsibleGuardian.mob);
      setresponsibleGuardianOccupation(responce.responsibleGuardian.occupation);
      setSpecialAchiev(responce.responsibleGuardian.specialAchiev);
      setSslc(responce.sslc)
      setHss(responce.hss);
      setPrevCourse(responce.prevCourse);
      setPrevshool(responce.prevShool);
      setAdmno(responce.admno);
      setFrom(responce.from);
      setTo(responce.to)
      setImage({
        imageUrl:responce.pic
      })
      setMaritalStatus(responce.maritalStatus)

        setBatch(responce.batch)
        console.log(batch);
      console.log(blood);
    })

  }, [])

  const [image, setImage] = useState({
    imageUrl: undefined,
    errormsg: undefined,
    errorFixInfo: undefined,
  });
  const ImageHandler = (e) => {
    if (e.target.files[0]?.size) {
      const fileSize = e.target.files[0].size;
      if (fileSize > 100000) {
        setImage({
          errormsg: "oops!! file too large",
          errorFixInfo: "max image size 100kb",
        });
      } else {

        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            console.log(reader);
            const imageGet = reader.result;
            setImage({ imageUrl: imageGet });
          }
        };
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
      }
    }
  };
const saveBtn = useRef()

  const profileclick = useRef();

  const ProfileClickFun = () => {
    profileclick.current.click();
  }

  const saveBtnActive = () => {
    saveBtn.current.click()
  }
  return (

    <div className={classes.StudentAddForm}>
      <div className={classes.EditButton} onClick={()=>{
            Edit();
            {
              if(
                editIco === true
              )
              saveBtnActive()
            }
      }} >
        <FaPen size="20px" color="#fafafa" /> 
      </div>
      <div className={classes.Form}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            console.log('clicked', e.target);
            bloodGroup = e.target[13][0].value
            admissionSecured = e.target[37][0].value;
            course = e.target[38][0].value
            residence = e.target[14][0].value;
            // sem = e.target[43][0].value;
          
            console.log('add', admissionSecured, 'res', residence, 'sem', sem, 'batch', batch, 'dobs',
              dob, 'sex', sex, 'etc', etc);
              setBValue('Uploaing...')

            if (!e.target[0].value) alert('select  photo')
            else {
              postPic()
              // postData()
            }



          }} className={classes.RealForm}>
          <div onClick={ProfileClickFun} className={classes.ProfilePic}>
            <img className={classes.Image} src={image.imageUrl} alt={null} />
          </div>
          <p className={classes.Errormsg}>
            {image.errormsg}<br />
            {image.errorFixInfo}
          </p>
          <input
            className={classes.profilePictureAdd}
            type="file"
            onChange={ImageHandler}
            accept="image/*"
            ref={profileclick} />

          <div className={classes.Fields}>
            <p className={classes.MainHead}>Personal Info</p>
            <label htmlFor="firstName"
              className={classes.InputField} >FirstName</label>
            <input type="text"
              /* pattern="[A-Za-z]" */
              disabled={editIco ? false : true }
              required
              value={fName}
              onChange={e => setFname(e.target.value)}
            />

            <label htmlFor="secondName"
              className={classes.InputField} >SecondName</label>
            <input type="text"
              // pattern="[A-Za-z]"
              required
              disabled={editIco ? false : true }
              value={lName}
              onChange={e => setLname(e.target.value)}
            />

            <label htmlFor="nameOfParent"
              className={classes.InputField} >ParentName</label>
            <input type="text"
              /* pattern="[A-Za-z]" */
              required
              disabled={editIco ? false : true }
              value={nameOfGuardian}
              onChange={e => setNameofGurdian(e.target.value)}
            />

            <label htmlFor="Homename"
              className={classes.InputField} >House Name</label>
            <input type="text"
              /* pattern="[A-Za-z]" */
              required
              disabled={editIco ? false : true }
              value={homeName}
              onChange={e => setHomename(e.target.value)}

            />

            <label htmlFor="Post"
              className={classes.InputField} >Post</label>
            <input type="text"
              /* pattern="[A-Za-z]" */
              required
              disabled={editIco ? false : true }
              value={post}
              onChange={e => setPost(e.target.value)}

            />

            <label htmlFor="City"
              className={classes.InputField} >City</label>
            <input type="text"
              /*  pattern="[A-Za-z]" */
              required
              disabled={editIco ? false : true }
              value={city}
              onChange={e => setCity(e.target.value)}
            />

            <label htmlFor="Pincode"
              className={classes.InputField} >Pin-Code</label>
            <input type="number"
              /* pattern="[0-9]"
   */            required
   disabled={editIco ? false : true }
              value={pincode}
              onChange={e => setPincode(e.target.value)}

            />

            <label htmlFor="mobilenumber"
              className={classes.InputField} >Mobile Number</label>
            <input type="number"
              /* pattern="[0-9]"
   */            required
   disabled={editIco ? false : true }
              value={mob1}
              onChange={e => setMob1(e.target.value)}
            />

            <label htmlFor="altmobileNumber"
              className={classes.InputField} >Mobile Number(Optional)</label>
            <input type="number"
              /* pattern="[0-9]"
   */
  disabled={editIco ? false : true }
              value={mob2}
              onChange={e => setMob2(e.target.value)}
            />

            <label htmlFor="dob"
              className={`${classes.InputField} ${classes.Dateofbirth}`} >DOB</label>
            <input type="date"
              required
              disabled={editIco ? false : true }
              value={dob}
              
              onChange={e => {

                setDob(e.target.value)
                console.log('dobs', dob);
              }}
            />
            <p>Sex</p>
            <div className={classes.sexField}>
              <label htmlFor="sexinput"
                className={classes.InputField} >
                  
                <input
                  id="sexinput"
                  type="radio"
                  value="Male"
                  name="sex"
                  required
                  checked={sex==='Male'?true:false}
                  disabled={editIco ? false : true }

                  onClick={(e) => {

                    setSex(e.target.value)
                    console.log('Male', sex)
                  }}
                />
        Male
        </label>

              <label htmlFor="sexinputf"
                className={classes.InputField}  >
                <input
                  id="sexinputf"
                  type="radio"
                  value="Female"
                  name="sex"
                  disabled={editIco ? false : true }
                  required
                  checked={sex==='Female'?true:false}
                  onClick={(e) => {

                    setSex(e.target.value)
                    console.log('male', sex)
                  }}
                />
        Female
        </label>
            </div>

            <label htmlFor="bloodGroup"
              className={`${classes.InputField} ${classes.Dateofbirth}`} >Blood Group</label>
            <select required  disabled={editIco ? false : true } >
              <option value={blood}>{blood}</option>
              {console.log('insec',bloodGroup)}
              <option value="A- (Negative)">A- (Negative)</option>
              <option value="A+ (Positive)">A+ (Positive)</option>
              <option value="B+ (Positive)">B+ (Positive)</option>
              <option value="B- (Negative)">B- (Negative)</option>
              <option value="O+ (Positive)">O+ (Positive)</option>
              <option value="O- (Negative)">O- (Negative)</option>
              <option value="AB+ (Positive)">AB+ (Positive)</option>
              <option value="AB- (Negative)">AB- (Negative)</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="residence"
              className={classes.InputField} >Residence</label>
            <select required  disabled={editIco ? false : true } >
            <option value={live}>{live}</option>
              <option value="With Parent">With Parent</option>
              <option value="With Relatives">With Relatives</option>
              <option value="College Hostel">College Hostel</option>
              <option value="Lodge">Lodge</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="relationshipwithguardien"
              className={classes.InputField} >Relationship With Guardian</label>
            <input type="text"
              /* pattern="[A-Za-z]" */
              disabled={editIco ? false : true }
              value={relationGuardin}
              onChange={e => {

                setRelationGuardin(e.target.value)
              }}

              required />

            <label htmlFor="Ocupationofguardien"
              className={classes.InputField} >Ocupation of Guardien</label>
            <input type="text"
              /* pattern="[A-Za-z]" */
              disabled={editIco ? false : true }
              required
              value={occupationOfGuardian}
              onChange={e => {

                setOccuptinofGurdian(e.target.value)

              }}

            />

            <label htmlFor="religion"
              className={classes.InputField} >Religion</label>
            <input type="text"
              required
              disabled={editIco ? false : true }
              value={religion}
              onChange={e => {

                setReligion(e.target.value)

              }}

            />

            <label htmlFor="cast"
              className={classes.InputField} >Cast</label>
            <input type="text"
              required
              disabled={editIco ? false : true }
              value={cast}
              onChange={e => {

                setCast(e.target.value)

              }}

            />

            <label htmlFor="mail"
              className={classes.InputField} >E-Mail</label>
            <input type="mail"
 disabled={editIco ? false : true }
              value={email}
              onChange={e => {

                setEmail(e.target.value)

              }}
            />

            <p>Martial Status</p>
            <div className={classes.martialstatus}>
              <label htmlFor="martial"
                className={classes.InputField} >
                <input
                  id="martial"
                  type="radio"
                  value="True"
                  name="martial"
                  required
                  disabled={editIco ? false : true }
                  checked={maritalStatus?true:false}
                  onClick={() => setMaritalStatus(true)}
                />
        True
        </label>

              <label  htmlFor="martialf"
                className={classes.InputField} >
                <input
                  id="martialf"
                  type="radio"
                  value="False"
                  name="martial"
                  required
                  disabled={editIco ? false : true }
                  checked={!maritalStatus?true:false}
                  onClick={() => {
                    setMaritalStatus(false)
                    
                    console.log(maritalStatus);
                  }}
                />
        False
        </label>
            </div>

            <label htmlFor="specialproblem"
              className={classes.InputField} >Special Problem</label>
            <input type="text"
 disabled={editIco ? false : true }
              value={specialProblem}
              onChange={e => {
                setSpecialProblem(e.target.value)
              }}
            />

            <p className={classes.MainHead}>Responsible Guardian Info</p>

            <label htmlFor="name"
              className={classes.InputField} >Name</label>
            <input type="text"
 disabled={editIco ? false : true }
              value={responsibleGuardianName}
              onChange={e => {
                setResponsibleGuardianName(e.target.value)
              }}

              required
            />

            <label htmlFor="relationship"
              className={classes.InputField} >Relationship</label>
            <input type="text"
              required
              disabled={editIco ? false : true }
              value={responsibleGuardianRelation}
              onChange={e => {
                setResponsibleGuardianRelation(e.target.value)
              }}
            />

            <label htmlFor="age"
              className={classes.InputField} >Age</label>
            <input type="number"
             disabled={editIco ? false : true }
              value={responsibleGuardianAge}
              onChange={e => {
                setResponsibleGuardianAge(e.target.value)
              }}
              required
            />

            <label htmlFor="guardianmobno"
              className={classes.InputField} >Mobile Number</label>
            <input type="number"
             disabled={editIco ? false : true }
              required
              value={responsibleGuardianMob}
              onChange={e => {
                setResponsibleGuardianMob(e.target.value)
              }}
            />

            <label htmlFor="occupation"
              className={classes.InputField} >Occupation</label>
            <input type="text"
             disabled={editIco ? false : true }
            />

            <p className={classes.MainHead}>Qualification Info</p>

            <p>Extra Curricular Activities</p>
            <div className={classes.extrac}>
              <label  htmlFor="extracA"
                className={classes.InputField} >
                <input
                  id="extracA"
                  type="checkbox"
                  value="Arts"
                  disabled={editIco ? false : true }
                  name="extrac"
                  onChange={e => {
                    console.log(e.target.checked);
                    e.target.checked ? etc.push(e.target.value) :
                      etc = etc.filter(function (item) {
                        return item !== e.target.value
                      })

                    console.log('etc', etc);
                  }}

                />
        Arts
        </label>

              <label  htmlFor="extracS"
                className={classes.InputField} >
                <input
                  id="extracS"
                  type="checkbox"
                  value="Sports"
                  disabled={editIco ? false : true }
                  name="extrac"
                  onChange={e => {
                    console.log(e.target.checked);
                    e.target.checked ? etc.push(e.target.value) :
                      etc = etc.filter(function (item) {
                        return item !== e.target.value
                      })
                    console.log('etc', etc);

                  }}
                />
        Sports
        </label>

              <label  htmlFor="extracN"
                className={classes.InputField} >
                <input
                  id="extracN"
                  type="checkbox"
                  value="NCC"
                  disabled={editIco ? false : true }
                  name="extrac"
                  onChange={e => {
                    console.log(e.target.checked);
                    e.target.checked ? etc.push(e.target.value) :
                      etc = etc.filter(function (item) {
                        return item !== e.target.value
                      })
                    console.log('etc', etc);

                  }}
                />
        NCC
        </label>

              <label  htmlFor="extracSS"
                className={classes.InputField} >
                <input
                  id="extracSS"
                  type="checkbox"
                  value="NSS"
                  disabled={editIco ? false : true }
                  name="extrac"
                  onChange={async e => {
                    console.log(e.target.checked);
                    e.target.checked ? etc.push(e.target.value) :
                      etc = etc.filter(function (item) {
                        return item !== e.target.value
                      })

                    console.log('etc', etc, 'a', etcActivity);
                  }}
                />
        NSS
        </label>
            </div>

            <label htmlFor="SpecialAchievments"
              className={classes.InputField} >Special Achievments</label>
            <input type="text"
             disabled={editIco ? false : true }
              value={specialAchiev}
              onChange={e => setSpecialAchiev(e.target.value)}
            />

            <label htmlFor="paper"
              className={classes.InputField} >SSLC/CBSE mark (%)
      </label>
            <input
             disabled={editIco ? false : true }
              type="number"
              required
              value={sslc}
              onChange={e => setSslc(e.target.value)}
            />

            <label  htmlFor="hsemark"
              className={classes.InputField} >HSE Paper (,)
      </label>
            <input
              type="text"
              disabled={editIco ? false : true }
              value={prevCourse}
              onChange={e => setPrevCourse(e.target.value)}
              required
            />

            <label  htmlFor="hsemark"
              className={classes.InputField} >HSE/CBSE mark (%)
      </label>
            <input
             disabled={editIco ? false : true }
              type="number"
              required
              value={hss}
              onChange={e => setHss(e.target.value)}
            />


            <label  htmlFor="institution"
              className={classes.InputField} >Institution last attended
      </label>
            <input
             disabled={editIco ? false : true }
              type="text"
              value={prevShool}
              onChange={e => setPrevshool(e.target.value)}
              required
            />

            <p className={classes.MainHead}>Admission Info</p>

            <label htmlFor="admissionsecured"
              className={classes.InputField}>admission secured</label>
            <select required  disabled={editIco ? false : true } >
              <option value="Management">Management</option>
              <option value="Merit">Merit</option>
              <option value="Muslim">Muslim</option>
              <option value="SC/ST">SC/ST</option>
              <option value="OBC/OEC">OBC/OEC</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="Course"
              className={classes.InputField}>Course</label>
            <select required  disabled={editIco ? false : true } >
              <option value="BSC computer science">BSC computer science</option>
              <option value="BSC Physics">BSC Physics</option>
              <option value="BSC Microbiology">BSC Microbiology</option>
              <option value="BSC Maths">BSC Maths</option>
              <option value="BSC Chemistry">BSC Chemistry</option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
              <option value="BCOM TT">BCOM TT</option>
              <option value="BCOM TT">BCOM CA</option>
              <option value="BCOM Finance)">BCOM Finance</option>
              <option value="BCOM Islamic Finance">BCOM Islamic Finance</option>
              <option value="BA Multimedia">BA Multimedia</option>
              <option value="BA Mass Communication">BA Mass Communication</option>
              <option value="BA English">BA English</option>
              <option value="BA Arabic">BA Arabic</option>
              <option value="BA Hindi">BA Hindi</option>
              <option value="BA Malayalam">BA Malayalam</option>
            </select>

            <label  htmlFor="admno"
              className={classes.InputField} >Admission Number
      </label>
            <input
             disabled={editIco ? false : true }
              type="number"
              required
              value={admno}
              onChange={e => setAdmno(e.target.value)}
            />

            <label  htmlFor="batch"
              className={classes.InputField} >Batch 
      </label>
            <input
             disabled={editIco ? false : true }
              type="text"
              required
              value={batch}
              onChange={e => setBatch(e.target.value)}
            />

          
          </div>
          {
            editIco ? <input   ref={saveBtn} type="submit" value={bValue}
            disabled={bValue === 'Uploading...' ? true : false}
            className={classes.Submit} /> : null
          }
          
        </form>
      </div>
    </div>
  )
}

export default StudentEditForm

