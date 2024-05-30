import React, { useState, useRef, } from 'react';
import QrReader from 'react-qr-reader'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function VotingLogin() {
    const navigate = useNavigate()
    const qrRef = useRef(null);
    const voterDetail = useSelector((store)=>store.vote)
    console.log("voting detail id",voterDetail);

    const [fileResult, setFileResult] = useState("");
    const [camerascan, setCameraScan] = useState(false);

    const handleScan = (result) => {
      console.log('handlesca',result)
        if (result) {
            console.log('Scan result:', result);
            const val = new Array(result)
            setFileResult(val);


        }
    };
    const handleError = (error) => {
        console.error('QR scan error:', error);
    };

    const handleQRButtonClick = () => {
      console.log("scan click",camerascan,qrRef);
        qrRef.current.openImageDialog();
    };
    let valid = "";


  const handleVotingLogin = async()=>{
    console.log(fileResult[0].length)

    // if(fileResult[0].split(",")[3].split("]")[0].length===333){
        if(fileResult[0].length===333){
        valid = "allowed"
        console.log(" if equal",valid);
    }
    else {
        valid = "not allowed"
        console.log(" if not",valid);
    }
    console.log(" check before going in backend",valid);
     const login = await fetch("/v1/voting/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"

        },
        body:JSON.stringify({adhar:fileResult[0].split(",")[3].split("]")[0],
        validUser:valid,
        VotingId:voterDetail.VotingId
    })
     })
       const data = await login.json()
     console.log(" login response",data.sucess);
     if(data.sucess){
      navigate("/vote/votingPortal")
        console.log(" valid user");
     }
     else
     alert('Not valid addhar or user already vote')

  }

  if(fileResult){
    handleVotingLogin()
    const check = Array.isArray(fileResult)
    // console.log(" check before going",check,fileResult[0].split(",")[3].split("]")[0]);
    console.log(" check ", check,fileResult[0].split(",")[3].split("]")[0].length);

    }

    return (
        <div className="w-80 m-10 ">

            <h2 className='text-center mb-7 text-3xl font-extrabold '>VOTING APP</h2>


                <QrReader

                ref={qrRef}
                delay={300}
                onError={handleError}
                onScan={handleScan}
                legacyMode={camerascan}
            />
            <div className='flex  justify-between'>
                 <button className='bg-cyan-500 p-3   mt-3 rounded-md ' onClick={handleQRButtonClick}>Scan</button>
            <button className='bg-cyan-500 p-3 mt-3 rounded-md ' onClick={() => setCameraScan(!camerascan)}>{camerascan ? "Scan using camera" : "Scan using photo"}</button>
            </div>
            <h2>{fileResult}</h2>
        </div>
    );
}

export default VotingLogin;
