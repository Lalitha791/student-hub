import "./Profile.css";
import { useEffect, useState } from "react";

function Profile() {

  const [getname, setname] = useState("");
  const [getphone, setphone] = useState("");
  const [getemail, setemail] = useState("");

  const [geterrorname, seterrorname] = useState(false);
  const [geterrorphone, seterrorphone] = useState(false);
  const [geterroremail, seterroremail] = useState(false);

  const [studentdata, setstudentdata] = useState([]);
  const [studentcount, setstudentcount] = useState(0);

  const [updateid, setupdateid] = useState("");

  const isdisabled = !getname || !getphone || !getemail;


  // Add student

  async function submit(e) {

    e.preventDefault();

    try {

      const response = await fetch(
        "https://api.elurucoders.online/api/students",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: getname,
            email: getemail,
            phone: getphone,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      setname("");
      setphone("");
      setemail("");

      seterrorname(false);
      seterrorphone(false);
      seterroremail(false);

      fetchStudents();

    } catch (error) {

      console.error("Error adding student:", error);

    }
  }


  // Get all students

  const fetchStudents = async () => {

    try {

      const response = await fetch(
        "https://api.elurucoders.online/api/students"
      );

      const result = await response.json();

      setstudentdata(result?.data || []);
      setstudentcount(result?.count || 0);

    } catch (error) {

      console.error("Error fetching students:", error);

    }
  };


  // Load students when page opens

  useEffect(() => {

    fetchStudents();

  }, []);


  // Edit student

  const handleEdit = async (studentId) => {

    setupdateid(studentId);

    try {

      const response = await fetch(
        `https://api.elurucoders.online/api/students/${studentId}`
      );

      const result = await response.json();

      setname(result.data.name);
      setphone(result.data.phone);
      setemail(result.data.email);

    } catch (error) {

      console.error(
        "Error fetching student:",
        error
      );

    }
  };


  // Update student

  async function update(e) {

    e.preventDefault();

    if (!updateid) {

      alert("Please select a student to update");

      return;
    }

    try {

      const response = await fetch(
        `https://api.elurucoders.online/api/students/${updateid}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: getname,
            email: getemail,
            phone: getphone,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      fetchStudents();

      setname("");
      setphone("");
      setemail("");
      setupdateid("");

    } catch (error) {

      console.error(
        "Error updating student:",
        error
      );

    }
  }


  // Delete student

  const handleDelete = async (studentId) => {

    try {

      const response = await fetch(
        `https://api.elurucoders.online/api/students/${studentId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      console.log(result);

      fetchStudents();

    } catch (error) {

      console.error(
        "Error deleting student:",
        error
      );

    }
  };


  // Name validation

  function handleErrorName() {

    if (getname === "") {

      seterrorname(true);

    } else {

      seterrorname(false);

    }
  }


  // Phone validation

  function handleErrorPhone() {

    if (getphone === "") {

      seterrorphone(true);

    } else {

      seterrorphone(false);

    }
  }


  // Email validation

  function handleErrorEmail() {

    if (getemail === "") {

      seterroremail(true);

    } else {

      seterroremail(false);

    }
  }


  return (

    <div className="profile-page">

      <div className="profile-container">

        {/* Heading */}

        <h1>Student Hub</h1>

        <p className="profile-subtitle">
          Manage your student information
        </p>


        {/* Form */}

        <form
          className="student-form"
          onSubmit={submit}
        >

          <div className="form-group">

            <label>Name</label>

            <input
              type="text"
              value={getname}
              placeholder="Enter name"
              onChange={(e) =>
                setname(e.target.value)
              }
              onBlur={handleErrorName}
            />

            {geterrorname && (
              <span className="error-message">
                Name is required
              </span>
            )}

          </div>


          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              value={getemail}
              placeholder="Enter email"
              onChange={(e) =>
                setemail(e.target.value)
              }
              onBlur={handleErrorEmail}
            />

            {geterroremail && (
              <span className="error-message">
                Email is required
              </span>
            )}

          </div>


          <div className="form-group">

            <label>Phone</label>

            <input
              type="text"
              value={getphone}
              placeholder="Enter phone"
              onChange={(e) =>
                setphone(e.target.value)
              }
              onBlur={handleErrorPhone}
            />

            {geterrorphone && (
              <span className="error-message">
                Phone is required
              </span>
            )}

          </div>


          {/* Buttons */}

          <div className="form-buttons">

            <button
              type="submit"
              disabled={isdisabled}
            >
              Add Student
            </button>

            <button
              type="button"
              className="update-button"
              onClick={update}
            >
              Update
            </button>

          </div>

        </form>


        {/* Student List */}

        <div className="student-section">

          <div className="student-heading">

            <h2>Students</h2>

            <span className="student-count">
              {studentcount}
            </span>

          </div>


          {/* Student Cards */}

          <div className="student-cards">

            {studentdata?.map(
              (student, index) => (

                <div
                  className="student-card"
                  key={student._id || index}
                >

                  <div className="card-number">
                    #{index + 1}
                  </div>

                  <h3>
                    {student.name}
                  </h3>

                  <div className="student-info">

                    <p>
                      <strong>Email:</strong>{" "}
                      {student.email}
                    </p>

                    <p>
                      <strong>Phone:</strong>{" "}
                      {student.phone}
                    </p>

                  </div>


                  <div className="card-buttons">

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(student._id)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() =>
                        handleDelete(student._id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;