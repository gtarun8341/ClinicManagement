const express = require('express');
const { protectSuperAdmin } = require('../Middlewares/requireLoginSuperAdmin');
const { consultantRegisterBySuperAdmin, consultantLogin, updateConsultantProfile, deleteConsultantById, getAllConsultant, getSingleConsultant } = require('../Controllers/ConsultantControllers');
const { UploadReport, deleteReport, getReport, getImage, deleteImages, UploadMultipleDocs } = require('../Controllers/CustomUploadModals');
const checkRolesPermissions = require('../Middlewares/PermissionRolesMiddleware');
const router = express.Router();

router.route("/").post(protectSuperAdmin, consultantRegisterBySuperAdmin);
router.route("/").get(checkRolesPermissions, getAllConsultant);
router.route("/:id").get(checkRolesPermissions, getSingleConsultant);
router.route("/login").post(checkRolesPermissions, consultantLogin);
router.route("/profile/:consultantId").put(checkRolesPermissions, updateConsultantProfile)
router.route("/:id").delete(checkRolesPermissions, protectSuperAdmin, deleteConsultantById)



router.route('/upload/:itemId/:uploadType').post(checkRolesPermissions, UploadReport)
router.route('/upload_files/:itemId/:uploadType').post(checkRolesPermissions, UploadMultipleDocs)
router.route('/remove/:id/:itemId/:uploadType').delete(checkRolesPermissions, deleteReport)
router.route('/get/:id').get(checkRolesPermissions, getReport)
router.route('/get/image/:id').get(checkRolesPermissions, getImage)
router.route('/delete/image/:itemId/:uploadType').delete(checkRolesPermissions, deleteImages)

module.exports = router