/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
import axios from 'axios';
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { imageWithAndHeight } from "utils";
import { SUPPORTED_FORMATS } from "constant";
import { createNftAction } from 'redux/action/nftAction';
import { nftcontract } from 'web3config/web3config';

export const useIgoApply =()=>{
	

    const navigate = useNavigate();
	const { active } = useWeb3React();

	const [coverImage, setCoverImage] = useState();

	const [buttonStatus, setButtonStatus] = useState({
		currentBtnText: "Mint",
		disabled: false,
	});

    const resetState = (helpers) => {
		helpers.resetForm();
		navigate("/");
	};

	const imageCheck = Yup.addMethod(
		Yup.mixed,
		"imageCheck",
		function (message, requiredWidth, requiredHeight) {
			return this.test(
				"image-width-height-check",
				message,
				async function (value) {
					const { path, createError } = this;

					if (!value) {
						return;
					}

					const imgDimensions = await imageWithAndHeight(value);

					if (imgDimensions.width !== requiredWidth) {
						return createError({
							path,
							message: `The file width needs to be the ${requiredWidth}px!`,
						});
					}

					if (imgDimensions.height !== requiredHeight) {
						return createError({
							path,
							message: `The file height needs to be the ${requiredHeight}px!`,
						});
					}

					return true;
				}
			);
		}
	);

	const [fileImg, setFileImg] = useState(null);
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")

    const formik = useFormik({
		initialValues: {
			nftname: "",
			artistname: "",
			coverImage: "",
			description: "",
		},
		validationSchema: Yup.object({
            nftname: Yup.string().required("nftname is required"),
			artistname: Yup.string().required("artistname is required"),
			description: Yup.string().required("description is required"),
			coverImage: Yup.mixed()
				.required("Please select a image")
				.test(
					"fileSize",
					"File is too large",
					(value) => value?.size <= 2000000
				)
				.test("fileType", "Only image are allowed", (value) =>
					SUPPORTED_FORMATS.includes(value?.type)
				)
		}),

		onSubmit: async (values, helpers) => {
			console.log("values NFT",values)
			console.log("helpers NFT",helpers)

			const sendJSONtoIPFS = async (ImgHash) => {

				try {
		
					const resJSON = await axios({
						method: "post",
						url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
						data: {
							"name":values.nftname,
							"nftname":values.nftname,
							"artistname":values.artistname,
							"image": ImgHash,
							"description":values.description

						},
						headers: {
							'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
							'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
						},
					});

					console.log('resJSON', resJSON)
					console.log("final ", `ipfs://${resJSON.data.IpfsHash}`)
					const tokenURI = `ipfs://${resJSON.data.IpfsHash}`;
					console.log("Token URI", tokenURI);
					// console.log(contractss);
					const trx=await nftcontract.safeMint(tokenURI);
					await trx.wait();
					console.log("minted successfully");
					alert(`NFT Minted successfully ${trx.hash}`);
					createNftAction({tokenURI})
					
				} catch (error) {
					console.log("JSON to IPFS: errrrrrrrrrrrrrrrr")
					console.log(error);
				}	
			}

			if(values.coverImage){
			  try{
					const formData =new FormData();
					formData.append("file",values.coverImage)
		
					const resFile =	await axios({
						method: "post",
							url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
							data: formData,
							headers: {
								'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
								'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
								"Content-Type": "multipart/form-data"
							},
					})
					console.log("resFile",resFile.data.IpfsHash)
					const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
					console.log('ImgHash', ImgHash)
					sendJSONtoIPFS(ImgHash)

				}
				catch(e){
					console.log("e--",e)
				}

			}

		
            resetState(helpers)

		},
	});

    const onCoverImageChange = (e) => {
		coverImage && URL.revokeObjectURL(coverImage);
		setCoverImage(URL.createObjectURL(e?.target?.files[0]));
		formik.values.coverImage = e.target.files[0];
	};

    return {
		formik,
		coverImage,
        onCoverImageChange,
		setButtonStatus,
		buttonStatus,
        resetState
	};
}