const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const errorResponseStatus = require("../utils/responses/errorResponseStatus.js");

const verifyToken = async (req, res, next) => {
  //Get token from headers
  // console.log("AUTH TOKEN", req.headers["x-access-token"], req.headers["authorization"].split(" ")[1], req.headers["authorization"]);
  let token = req.headers["x-access-token"] /*|| req.headers["authorization"].split(" ")[1]*/;
  // console.log(token);
  if(!req.headers["x-access-token"]) return next(errorResponseStatus(res, "Your auth token is invalid", 403, null));

  if (!token) {
    return next(errorResponseStatus(res, "You need to login to perform this action", 403, null));
  }

  //verify and decode token
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return next(errorResponseStatus(res, "Unauthorized access", 401, null));
    }

    //store decoded token in request
    req.user = decoded.user;

    next();
  });
};

//Permissioins based on admin role
const admin = async (req, res, next) => {
  //Get token from headers
  let token = req.headers["x-access-token"];

  if (!token) {
    return next(errorResponseStatus(res, "You need to login to perform this action", 403, null));
  }
  //verify and decode token
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return next(errorResponseStatus(res, "You need to login to perform this action", 401, null));
    }

    if (decoded.user.role == 'admin') {
      //store decoded token in request
      req.user = decoded.user;
    } else {
      return next(errorResponseStatus(res, "You are not authorized to perform this action", 401, null));
    }


    next();
  });
};

//Permissioins based on Super admin role
const superadmin = async (req, res, next) => {
  //Get token from headers
  let token = req.headers["x-access-token"];

  if (!token) {
    return next(errorResponseStatus(res, "You need to login to perform this action", 403, null));
  }
  //verify and decode token
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return next(errorResponseStatus(res, "You need to login to perform this action", 401, null));
    }

    if (decoded.user.role == 'superadmin') {
      //store decoded token in request
      req.user = decoded.user;
      next();
    } else {
      return next(errorResponseStatus(res, "You are not authorized to perform this action", 401, null));
    }

  });
};

const authJwt = {
  verifyToken,
  admin,
  superadmin
};

module.exports = authJwt;