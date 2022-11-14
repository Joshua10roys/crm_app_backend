import jwt from 'jsonwebtoken';

// to check token and decode
function checkToken(req, res, next) {

   try {
      const token = req.headers.token;

      if (token) {

         jwt.verify(token, process.env.PRIVATE_KEY, (error, decoded) => {

            if (decoded) {
               req.headers._id = decoded._id;
               req.headers.userType = decoded.userType;
               next();
            } else if (error) {
               res.status(302).send({ status: 302, msg: 'Your session expired', redirect: '/user/login' })
            }

         })
      } else {
         res.status(302).send({ status: 302, msg: 'Your session expired', redirect: '/user/login' })
      }
   } catch (error) {
      console.log(error)
   }
}

// to compare params id & decoded id of user
function checkIdMatch(req, res, next) {

   try {

      if (req.params._id == req.headers._id) {
         next();
      } else {
         res.status(401).send({ status: 401, msg: 'Only user can edit his credentials' })
      }
   } catch (error) {
      console.log(error);
   }
}

// authentication for view only and above
async function authViewOnly(req, res, next) {

   try {
      const userType = req.headers.userType;

      if ((userType == 'view only') || (userType == 'employee') ||
         (userType == 'manager') || (userType == 'admin')) {
         next();
      } else {
         res.status(401).send({ status: 401, msg: 'Access Denied' })
      }

   } catch (error) {
      console.log(error)
   }
}

// authentication for employee and above
async function authEmployee(req, res, next) {

   try {
      const userType = req.headers.userType;

      if ((userType == 'employee') || (userType == 'manager') || (userType == 'admin')) {
         next();
      } else {
         res.status(401).send({ status: 401, msg: 'Access Denied' })
      }

   } catch (error) {
      console.log(error)
   }
}

// authentication for manager and admin
async function authManager(req, res, next) {

   try {
      const userType = req.headers.userType;

      if ((userType == 'manager') || (userType == 'admin')) {
         next();
      } else {
         res.status(401).send({ status: 401, msg: 'Access Denied' })
      }

   } catch (error) {
      console.log(error)
   }
}

// authentication for admin
async function authAdmin(req, res, next) {

   try {
      const userType = req.headers.userType;

      if (userType == 'admin') {
         next();
      } else {
         res.status(401).send({ status: 401, msg: 'Access Denied' })
      }

   } catch (error) {
      console.log(error)
   }
}

export { checkToken, checkIdMatch, authViewOnly, authEmployee, authManager, authAdmin };