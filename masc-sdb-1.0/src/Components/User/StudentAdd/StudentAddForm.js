import React, { useRef, useState } from 'react'
import classes from './StudentAdd.module.css'
import { cloud } from './key'
import {useHistory} from 'react-router-dom'
const StudentAddForm = () => {
   
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
  let batch
  const [sslc, setSslc] = useState('');
  const [email, setEmail] = useState('');
  const [hss, setHss] = useState('');
  const [etcActivity, setEtcActivity] = useState([])
  let etc = []
  let residence
  const [religion, setReligion] = useState('');
  const [cast, setCast] = useState('');
  const [prevShool, setPrevshool] = useState('');

  const [recommanted, setRecommanted] = useState('');
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



  const token = localStorage.getItem('mascStudetDb');

  const postData = () => {
    if (pic) {

      console.log(bloodGroup);
      console.log(admissionSecured);
      fetch('student/newstudent', {
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
          recommanted,
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
          admno
        })
      }).then(res => res.json()).then(responce => {
        if (responce.error) {
          alert(responce.error)
          setBValue('Submit')
        }
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
  const profileclick = useRef();

  const ProfileClickFun = () => {
    profileclick.current.click();
  }
  return (

    <div className={classes.StudentAddForm}>
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
            batch = from + '/' + to
            console.log('add', admissionSecured, 'res', residence, 'sem', sem, 'batch', batch, 'dobs',
              dob, 'sex', sex, 'etc', etc);

            if (!e.target[0].value) alert('select  photo')
            else {
              setBValue('Uploading...')
              postPic()

              //  postData()
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
              required
              value={fName}
              onChange={e => setFname(e.target.value)}
            />

            <label htmlFor="secondName"
              className={classes.InputField} >SecondName</label>
            <input type="text"
              /* pattern="[A-Za-z]" */
              required

              value={lName}
              onChange={e => setLname(e.target.value)}
            />

            <label htmlFor="nameOfParent"
              className={classes.InputField} >ParentName</label>
            <input type="text"
              /* pattern="[A-Za-z]" */
              required

              value={nameOfGuardian}
              onChange={e => setNameofGurdian(e.target.value)}
            />

            <label htmlFor="Homename"
              className={classes.InputField} >House Name</label>
            <input type="text"
              /* pattern="[A-Za-z]" */
              required
              value={homeName}
              onChange={e => setHomename(e.target.value)}

            />

            <label htmlFor="Post"
              className={classes.InputField} >Post</label>
            <input type="text"
              /* pattern="[A-Za-z]" */
              required
              value={post}
              onChange={e => setPost(e.target.value)}

            />

            <label htmlFor="City"
              className={classes.InputField} >City</label>
            <input type="text"
              /*  pattern="[A-Za-z]" */
              required

              value={city}
              onChange={e => setCity(e.target.value)}
            />

            <label htmlFor="Pincode"
              className={classes.InputField} >Pin-Code</label>
            <input type="number"
              /* pattern="[0-9]"
   */            required
              value={pincode}
              onChange={e => setPincode(e.target.value)}

            />

            <label htmlFor="mobilenumber"
              className={classes.InputField} >Mobile Number</label>
            <input type="number"
              /* pattern="[0-9]"
   */            required
              value={mob1}
              onChange={e => setMob1(e.target.value)}
            />

            <label htmlFor="altmobileNumber"
              className={classes.InputField} >Mobile Number(Optional)</label>
            <input type="number"
              /* pattern="[0-9]"
   */

              value={mob2}
              onChange={e => setMob2(e.target.value)}
            />

            <label htmlFor="dob"
              className={`${classes.InputField} ${classes.Dateofbirth}`} >DOB</label>

            <input type="date"
              required

              value={dob}
              onChange={e => {

                setDob(e.target.value)
                console.log('dobs', dob);
              }}
            /> 

            
            <p>Sex</p>
            <div className={classes.sexField}>
              <label  htmlFor="sexinputm"
                className={classes.InputField} >
                <input
                  id="sexinputm"
                  type="radio"
                  value="Male"
                  name="sex"
                  required

                  onClick={(e) => {

                    setSex(e.target.value)
                    console.log('male', sex)
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
                  required

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
            <select required >
              <option value="A+ (Positive)">A+ (Positive)</option>
              <option value="A- (Negative)">A- (Negative)</option>
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
            <select required >
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
              value={relationGuardin}
              onChange={e => {

                setRelationGuardin(e.target.value)
              }}

              required />

            <label htmlFor="Ocupationofguardien"
              className={classes.InputField} >Ocupation of Guardien</label>
            <input type="text"
              /* pattern="[A-Za-z]" */
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

              value={religion}
              onChange={e => {

                setReligion(e.target.value)

              }}

            />

            <label htmlFor="cast"
              className={classes.InputField} >Cast</label>
            <input type="text"
              required

              value={cast}
              onChange={e => {

                setCast(e.target.value)

              }}

            />

            <label htmlFor="mail"
              className={classes.InputField} >E-Mail</label>
            <input type="mail"

              value={email}
              onChange={e => {

                setEmail(e.target.value)

              }}
            />

            <p>Martial Status</p>
            <div className={classes.martialstatus}>
              <label htmlFor="martialt"
                className={classes.InputField} >
                <input
                  id="martialt"
                  type="radio"
                  value="True"
                  name="martial"
                  required

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

              value={specialProblem}
              onChange={e => {
                setSpecialProblem(e.target.value)
              }}
            />

            <p className={classes.MainHead}>Responsible Guardian Info</p>

            <label htmlFor="name"
              className={classes.InputField} >Name</label>
            <input type="text"

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
              value={responsibleGuardianRelation}
              onChange={e => {
                setResponsibleGuardianRelation(e.target.value)
              }}
            />

            <label htmlFor="age"
              className={classes.InputField} >Age</label>
            <input type="number"
              value={responsibleGuardianAge}
              onChange={e => {
                setResponsibleGuardianAge(e.target.value)
              }}
              required
            />

            <label htmlFor="guardianmobno"
              className={classes.InputField} >Mobile Number</label>
            <input type="number"
              required
              value={responsibleGuardianMob}
              onChange={e => {
                setResponsibleGuardianMob(e.target.value)
              }}
            />

            <label htmlFor="occupation"
              className={classes.InputField} >Occupation</label>
            <input type="text"
            />

            <p className={classes.MainHead}>Qualification Info</p>

            <p>Extra Curricular Activities</p>
            <div className={classes.extrac}>
              <label htmlFor="extracA"
                className={classes.InputField} >
                <input
                  id="extracA"
                  type="checkbox"
                  value="Arts"
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

              <label htmlFor="extracSS"
                className={classes.InputField} >
                <input
                  id="extracSS"
                  type="checkbox"
                  value="NSS"
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
              value={specialAchiev}
              onChange={e => setSpecialAchiev(e.target.value)}
            />

            <label  htmlFor="paper"
              className={classes.InputField} >SSLC/CBSE mark (%)
      </label>
            <input
              type="number"
              required
              value={sslc}
              onChange={e => setSslc(e.target.value)}
            />

            <label  htmlFor="sslcmark"
              className={classes.InputField} >HSE Paper (,)
      </label>
            <input
              type="text"
              value={prevCourse}
              onChange={e => setPrevCourse(e.target.value)}
              required
            />

            <label htmlFor="hsemark"
              className={classes.InputField} >HSE/CBSE mark (%)
      </label>
            <input
              type="number"
              required
              value={hss}
              onChange={e => setHss(e.target.value)}
            />


            <label htmlFor="institution"
              className={classes.InputField} >Institution last attended
      </label>
            <input
              type="text"
              value={prevShool}
              onChange={e => setPrevshool(e.target.value)}
              required
            />

            <p className={classes.MainHead}>Admission Info</p>

            <label htmlFor="admissionsecured"
              className={classes.InputField}>admission secured</label>
            <select required >
              <option value="Management">Management</option>
              <option value="Merit">Merit</option>
              <option value="Muslim">Muslim</option>
              <option value="SC/ST">SC/ST</option>
              <option value="OBC/OEC">OBC/OEC</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="Course"
              className={classes.InputField}>Course</label>
            <select required >
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
              type="number"
              required
              value={admno}
              onChange={e => setAdmno(e.target.value)}
            />

            <label  htmlFor="batch"
              className={classes.InputField} >Batch From
      </label>
            <input
              type="number"
              required
              value={from}
              onChange={e => setFrom(e.target.value)}
            />

            <label  htmlFor="batch"
              className={classes.InputField} >Batch To
      </label>
            <input
              type="number"
              required
              value={to}
              onChange={e => setTo(e.target.value)}
            />

          </div>
          <input type="submit" value={bValue}
            disabled={bValue === 'Uploading...' ? true : false}
            className={classes.Submit} />
        </form>
      </div>
    </div>
  )
}

export default StudentAddForm

