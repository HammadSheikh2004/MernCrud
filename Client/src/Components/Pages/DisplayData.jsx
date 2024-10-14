import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const DisplayData = () => {
    const [getData, setGetData] = useState([]);
    let userId = 1;

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:3000/user/showUser',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            setGetData(res.data);
        }).catch((err) => {
            console.error(err);
        });
    }, []);


    const DeleteData = (id) => {
        axios({
            method: "DELETE",
            url: `http://localhost:3000/user/deleteData/${id}`
        }).then((res) => {
            alert(res.data.message);
            setGetData(getData.filter(item => item._id !== id));
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <div className='container'>
            <div className="row mb-2">
                <div className="col-md-12">
                    <div className="my-2 rounded bg-primary">
                        <div className="h2 text-center py-2 text-white">Fetched Data</div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Date</th>
                                <th scope="col">Image</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getData && getData.map((item, key) => (

                                <tr key={item._id}>
                                    <td>{userId++}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.date}</td>
                                    <td>
                                        <img src={`http://localhost:3000/Images/UserImages/${item.image}`} width="50px" height="50px" alt="" />
                                    </td>


                                    <td>
                                        <NavLink className='btn btn-primary me-2' to={`/editData/${item._id}`}>
                                            Edit
                                        </NavLink>
                                        <button className='btn btn-danger' onClick={() => DeleteData(item._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DisplayData;
