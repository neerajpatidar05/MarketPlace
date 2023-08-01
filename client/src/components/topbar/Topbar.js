/* eslint-disable jsx-a11y/anchor-is-valid */
import { useWeb3React } from "@web3-react/core";
import { Box } from "@material-ui/core";
import { injected } from "connection";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

export default function Topbar() {
  // const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const [open, setopen] = useState(false);
  const { activate, error, active, account, deactivate } = useWeb3React();

  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    injected?.isAuthorized()?.then((isAuthorized) => {
      if (isAuthorized && !active && !error) {
        activate(injected);
      }
    });
  }, [error, activate]);

  return (
    <>
      <Box position="relative" zIndex={10}>
        <header
          id="gamfi-header"
          className="gamfi-header-section default-header"
        >
          <div className="menu-area menu-sticky">
            <div className="container">
              <div className="heaader-inner-area d-flex justify-content-between align-items-center">
                <div className="gamfi-logo-area d-flex justify-content-between align-items-center">
                  <div className="logo">
                    <Link to="/">
                      <a>
                        <img
                          width="150px"
                          src="https://www.logisticinfotech.com/wp-content/uploads/2018/01/logistic-logo.svg"
                          alt="logo"
                        />
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="menu-area menu-sticky">
                  <div className="container">
                    <div className="heaader-inner-area d-flex justify-content-between align-items-center">
                      <div className="gamfi-logo-area d-flex justify-content-between align-items-center">
                        
                        <div className="header-menu">
                          <ul className="nav-menu">
                            {account &&
                              <>
							  <li>
															  <a
																  style={{
																	  cursor: "pointer"
																  }}
															  >
																  Members
															  </a>
															  <ul className="sub-menu">
																  <li>
																	  <Link
																		  style={{
																			  padding: "0px"
																		  }}
																		  to="/createnft"
																	  >
																		  <a>Create NFT</a>
																	  </Link>
																  </li>

																  <li>
																	  <Link
																		  style={{
																			  padding: "0px"
																		  }}
																		  to="/"
																	  >
																		  <a> NFT Collection</a>
																	  </Link>
																  </li>
																  {/* <li>
																	  <Link
																		  style={{
																			  padding: "0px"
																		  }}
																		  to="/"
																	  >
																		  <a>Sold NFT Collection</a>
																	  </Link>
																  </li> */}
                                  <li>
                                  <Link
																		  style={{
																			  padding: "0px"
																		  }}
																		  to="/profile"
																	  >
																		  <a>Profile</a>
																	  </Link>
                                  </li>
                                  <li>
                                  <Link
																		  style={{
																			  padding: "0px"
																		  }}
																		  to="/listednft"
																	  >
																		  <a>ListedNFT</a>
																	  </Link>
                                  </li>
															  </ul>
														  </li>

														  <li>
																  <a href="https://defi-exchange-divyeshvora-logisticinfo.vercel.app/"
																	  style={{
																		  cursor: "pointer"
																	  }}
																	  target="_blank" rel="noreferrer"
																  >
																	  Swap-Exchange
																  </a>
														
															  </li>
															  </>
                            }
                          </ul>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
                <div className="gamfi-btn-area">
                  <ul>
                    <li>
                      {account ? (
                        <>
                          <button
                            type="button"
                            className="readon white-btn hover-shape"
                            onClick={() => deactivate()}
                          >
                            <img
                              src="assets/images/icons/connect.png"
                              alt="Icon"
                            />
                            <span className="btn-text">
                              {account.slice(0, 5) + "..." + account.slice(-4)}{" "}
                            </span>
                            <span className="hover-shape1" />
                            <span className="hover-shape2" />
                            <span className="hover-shape3" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="readon white-btn hover-shape"
                            onClick={() => activate(injected)}
                          >
                            <img
                              src="assets/images/icons/connect.png"
                              alt="Icon"
                            />
                            <span className="btn-text">Connect </span>
                            <span className="hover-shape1" />
                            <span className="hover-shape2" />
                            <span className="hover-shape3" />
                          </button>
                        </>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
      </Box>
    </>
  );
}
