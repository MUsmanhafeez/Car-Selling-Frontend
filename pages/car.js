import React, { useState } from "react";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Upload,
  message,
  Select,
  Button,
  Input,
  Typography,
  Row,
  Col,
  Form,
  Modal,
  Image,
} from "antd";
import { addCarRecord } from "./api/car";
import toast from "react-hot-toast";
import { SyncLoader } from "react-spinners";

const { Dragger } = Upload;
const { Option } = Select;

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const SubmitCar = () => {
  const [form] = Form.useForm();
  const [maxPictures, setMaxPictures] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = ({ fileList }) => {
    if (fileList.length > maxPictures) {
      setError(
        `You can only upload up to ${maxPictures} pictures, please select max length of pictures!`
      );
    } else {
      setPictures(fileList);
      setError("");
    }
  };

  const handlePreview = (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  };

  const handleCancel = () => setPreviewVisible(false);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("model", values.carModel);
    formData.append("price", values.price);
    formData.append("phone", values.phone);
    formData.append("city", values.city);
    formData.append("maxPictures", maxPictures);
    pictures.forEach((pic) => {
      formData.append("images", pic.originFileObj);
    });
    try {
      setLoading(true); // Set loading state to true
      const response = await addCarRecord(formData);
      if (response.data) {
        toast.success(response.message);
        console.log("Car submitted successfully:", response);
        form.resetFields();
        setPictures([]);
      } else {
        toast.error(response.message || "Error submitting car details");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Error submitting car details:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const uploadButton = (
    <Button icon={<PlusOutlined />} type="primary">
      Upload
    </Button>
  );

  return (
    <>
      {loading ? (
        <div className="loader-style">
          <div className="text-center my-5">
            <SyncLoader color="#1677ff" />
          </div>
        </div>
      ) : (
        <div>
          <Row justify="center" style={{ marginTop: 50 }}>
            <Col xs={24} sm={20} md={16} lg={12} xl={10}>
              <Typography.Title level={2} align="center">
                Submit Car Details
              </Typography.Title>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ maxPictures: 1 }}>
                <Form.Item
                  label="Car Model"
                  name="carModel"
                  rules={[
                    { required: true, message: "Please enter the car model" },
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[
                    { required: true, message: "Please enter the price" },
                  ]}>
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the phone number",
                    },
                  ]}>
                  <Input type="number" maxLength={11} />
                </Form.Item>
                <Form.Item
                  label="City"
                  name="city"
                  rules={[
                    { required: true, message: "Please enter the city" },
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Max Pictures"
                  name="maxPictures"
                  rules={[
                    {
                      required: true,
                      message: "Please select the number of pictures",
                    },
                  ]}>
                  <Select onChange={setMaxPictures}>
                    {[...Array(10).keys()].map((number) => (
                      <Option key={number + 1} value={number + 1}>
                        {number + 1}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Upload Pictures">
                  <Dragger
                    multiple
                    listType="picture-card"
                    beforeUpload={beforeUpload}
                    onChange={handleFileChange}
                    fileList={pictures}
                    onPreview={handlePreview}
                    showUploadList={{
                      showPreviewIcon: true,
                      showRemoveIcon: true,
                      showDownloadIcon: false,
                    }}
                    accept="image/*">
                    {pictures.length >= maxPictures ? null : uploadButton}
                  </Dragger>
                  {error && (
                    <Typography.Text type="danger">{error}</Typography.Text>
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginTop: 16 }}
                    block>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Modal
            open={previewVisible}
            title="Image Preview"
            footer={null}
            onCancel={handleCancel}>
            <Image alt="example" src={previewImage} />
          </Modal>
        </div>
      )}
    </>
  );
};

export default SubmitCar;
