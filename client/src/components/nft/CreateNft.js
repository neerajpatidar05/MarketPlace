/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box } from '@mui/material'
import { useIgoApply } from 'hook/useIgoApplyHook'
import React from 'react'

function CreateNft() {
  const {
    formik,
    coverImage,
    onCoverImageChange,
    setButtonStatus,
    buttonStatus,
  } = useIgoApply()
  return (
    <>
      <Box>
        <div className="gamfi-breadcrumbs-section">
          <div className="container">
            <div className="apply-heading text-center">
              <h2 className="mb-0">Create New NFT</h2>
            </div>
          </div>
        </div>
        <div className="gamfi-form-content pt-65 md-pt-45 pb-120 md-pb-80">
          <div className="container">
            <div className="address-form">
              <form
                noValidate
                onSubmit={formik.handleSubmit}
                // autocomplete="off"
              >
                <div>
                  <h4 className="mb-0">1. Project Details</h4>
                  <p className="text-white">
                    Please complete the required project details
                  </p>
                </div>
                <div className="input-button">
                  <div className="file-upload">
                    <div className="image-upload-wrap">
                      <input
                        className="file-upload-input"
                        type="file"
                        accept="image/*"
                        required={true}
                        name="coverImage"
                        onChange={
                        	onCoverImageChange
                        }
                        onBlur={formik.handleBlur}
                      />
                      <div className="drag-text">
                        {coverImage ? (
                          <img
                            src={coverImage}
                            alt="project image"
                          />
                        ) : (
                          <>
                            <svg
                              className="mx-auto upload-icon-svg h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <p className="form-text text-white">
                              Upload a file or drag and drop
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <label htmlFor="project-cover" className="text-white">
                    Project Background *
                  </label>
                  <div className="form-text text-white">
											{Boolean(
												formik.touched.coverImage &&
													formik.errors.coverImage
											) ? (
												<span className="form-text text-danger">
													{formik.errors.coverImage}
												</span>
											) : (
												"NFT Image"
											)}
										</div>
                </div>
                <div className="input-button">
                  <input
                    type="text"
                    id="nftname"
                    placeholder="Item Name"
                    required={true}
                    name="nftname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nftname}
                  />
                  <label htmlFor="token-address" className="text-white">
                    Nft Name *
                  </label>
                  <div className="form-text text-white">
											{Boolean(
												formik.touched.itemname &&
													formik.errors.itemname
											) && (
												<span className="form-text text-danger">
													{formik.errors.itemname}
												</span>
											)}
										</div>
                </div>
                <div className="input-button">
                  <input
                    type="text"
                    id="artistname"
                    placeholder="Artist Name"
                    required={true}
                    name="artistname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.artistname}
                  />
                  <label htmlFor="token-address" className="text-white">
                    Artist Name *
                  </label>
                  <div className="form-text text-white">
											{Boolean(
												formik.touched.artistname &&
													formik.errors.artistname
											) && (
												<span className="form-text text-danger">
													{formik.errors.artistname}
												</span>
											)}
										</div>
                </div>
                <div className="input-button">
                  <textarea
                    type="text"
                    className="mb-0"
                    rows={3}
                    id="description"
                    name="description"
                    placeholder="Description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                  <label htmlFor="short-desc" className="text-white">
                    Description *
                  </label>
                  <div className="form-text text-white">
                    Brief description of your NFT.
                  </div>
                  <div className="form-text text-white">
											{Boolean(
												formik.touched.description &&
													formik.errors.description
											) && (
												<span className="form-text text-danger">
													{formik.errors.description}
												</span>
											)}
										</div>
                </div>
                <div className="project-btn-area text-center black-shape-big mt-40">
                  <input
                    type="submit"
                    name="Mint"
                    value={buttonStatus.currentBtnText}
                    disabled={buttonStatus.disabled}
                  />
                  <span className="hover-shape1" />
                  <span className="hover-shape2" />
                  <span className="hover-shape3" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Box>
    </>
  )
}

export default CreateNft
