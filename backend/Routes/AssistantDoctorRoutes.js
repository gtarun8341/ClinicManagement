const express = require('express');
const { assistantDoctorRegisterBySuperAdmin, getAllAssistantDoctor, AssistantDoctorLogin, deleteAssistantDoctorById, getSingleAssistantDoctor, updateAssistantDoctor } = require("../Controllers/AssistantDoctorController")
const { protectSuperAdmin } = require("../Middlewares/requireLoginSuperAdmin");
const { getAllDoctor_External } = require('../Controllers/Public/ExternalDoctorController');
const { UploadReport, deleteReport, getReport, getImage, deleteImages, UploadMultipleDocs } = require('../Controllers/CustomUploadModals');
const checkRolesPermissions = require('../Middlewares/PermissionRolesMiddleware');

const router = express.Router();

router.route('/login').post(AssistantDoctorLogin)
router.route("/profile/:doctorId").put(checkRolesPermissions, updateAssistantDoctor)
router.route("/:id").delete(checkRolesPermissions, protectSuperAdmin, deleteAssistantDoctorById)
router.route("/:id").get(checkRolesPermissions, getSingleAssistantDoctor)
router.route('/').get(checkRolesPermissions, getAllAssistantDoctor);
router.route('/').post(checkRolesPermissions, protectSuperAdmin, assistantDoctorRegisterBySuperAdmin)

router.route('/upload/:itemId/:uploadType').post(checkRolesPermissions, UploadReport)
router.route('/upload_files/:itemId/:uploadType').post(checkRolesPermissions, UploadMultipleDocs)
router.route('/remove/:id/:itemId/:uploadType').delete(checkRolesPermissions, deleteReport)
router.route('/get/:id').get(checkRolesPermissions, getReport)
router.route('/get/image/:id').get(checkRolesPermissions, getImage)
router.route('/delete/image/:itemId/:uploadType').delete(checkRolesPermissions, deleteImages)


module.exports = router