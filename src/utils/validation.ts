import * as yup from 'yup'

export const loginSchema = yup.object({
    email: yup.string().email('Email không hợp lệ').required('Bắt buộc'),
    password: yup.string().min(6, 'Tối thiểu 6 ký tự').required('Bắt buộc'),
})

export const registerSchema = yup.object({
    name: yup.string().required('Bắt buộc'),
    email: yup.string().email('Email không hợp lệ').required('Bắt buộc'),
    password: yup.string().min(6, 'Tối thiểu 6 ký tự').required('Bắt buộc'),
    phone: yup.string().required('Bắt buộc'),
    birthday: yup.string().required('Bắt buộc'),
    gender: yup.boolean().required('Bắt buộc'),
})

export const bookingSchema = yup.object({
    maPhong: yup.number().required('Bắt buộc'),
    ngayDen: yup.string().required('Bắt buộc'),
    ngayDi: yup.string().required('Bắt buộc'),
    soLuongKhach: yup.number().min(1, 'Ít nhất 1 khách').required('Bắt buộc'),
    maNguoiDung: yup.number().required('Bắt buộc'),
})

export const locationSchema = yup.object({
    tenViTri: yup.string().required('Bắt buộc'),
    tinhThanh: yup.string().required('Bắt buộc'),
    quocGia: yup.string().required('Bắt buộc'),
    hinhAnh: yup.string().url('URL không hợp lệ').required('Bắt buộc'),
})

export const roomSchema = yup.object({
    tenPhong: yup.string().required('Bắt buộc'),
    khach: yup.number().min(1).required('Bắt buộc'),
    phongNgu: yup.number().min(0).required('Bắt buộc'),
    giuong: yup.number().min(0).required('Bắt buộc'),
    phongTam: yup.number().min(0).required('Bắt buộc'),
    moTa: yup.string().required('Bắt buộc'),
    giaTien: yup.number().min(0).required('Bắt buộc'),
    maViTri: yup.number().required('Bắt buộc'),
    hinhAnh: yup.string().url('URL không hợp lệ').required('Bắt buộc'),
})
