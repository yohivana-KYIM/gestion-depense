import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { object, string, number, date as yupDate } from "yup";
import moment from "moment";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  DatePicker,
} from "@nextui-org/react";

import { Title, Category, Amount, Edit } from "../../utils/Icons";
import {
  closeModal,
  setRefetch,
} from "../../features/TransactionModals/viewAndUpdateModal";
import { updateLoader } from "../../features/loader/loaderSlice";
import { useUpdateExpenseMutation } from "../../features/api/apiSlices/expenseApiSlice";
import { useUpdateIncomeMutation } from "../../features/api/apiSlices/incomeApiSlice";
import validateForm from "../../utils/validateForm";

const TransactionViewAndUpdateModal = () => {
  const data = useSelector((state) => state.transactionViewAndUpdateModal);
  const {
    isOpen,
    isDisabled,
    transaction: initialTransaction,
    type,
    _id,
  } = data;
  const [mainTitle, setMainTitle] = useState("");
  const dispatch = useDispatch();

  // Initialisation des données du formulaire avec des dates formatées
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: moment().format("YYYY-MM-DD"), // Format ISO 8601
  });

  const [errors, setErrors] = useState({});

  const incomeCategories = [
    { label: "Salary", value: "salary" },
    { label: "Freelance", value: "freelance" },
    { label: "Investments", value: "investments" },
    { label: "Rent", value: "rent" },
    { label: "Youtube", value: "youtube" },
    { label: "Bitcoin", value: "bitcoin" },
    { label: "Other", value: "other" },
  ];
  const expenseCategories = [
    { label: "Groceries", value: "groceries" },
    { label: "Utilities", value: "utilities" },
    { label: "Transportation", value: "transportation" },
    { label: "Healthcare", value: "healthcare" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Clothing", value: "clothing" },
    { label: "Other", value: "other" },
  ];

  const validationSchema = object({
    title: string()
      .required("Title is required.")
      .min(5, "Title must be atleast 5 characters long.")
      .max(15, "Title should not be more than 15 characters."),
    amount: number("Amount must be a number")
      .required("Amount is required.")
      .positive("Amount must be positive."),
    description: string()
      .required("Description is required.")
      .min(5, "Description must be atleast 5 characters long.")
      .max(80, "Description should not be more than 80 characters."),
    date: yupDate().required("Date is required."),
    category: string()
      .required("Category is required.")
      .oneOf(
        type === "income"
          ? incomeCategories.map((category) => category.value)
          : expenseCategories.map((category) => category.value),
        "Invalid category selected."
      ),
  });

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    validateForm(e.target.name, e.target.value, validationSchema, setErrors);
  };

  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      date: moment(newDate).format("YYYY-MM-DD"), // Format ISO 8601
    });
  };

  const {
    title,
    amount,
    category,
    description,
    date: transactionDate,
  } = formData;
  const mutationHook =
    type === "income" ? useUpdateIncomeMutation : useUpdateExpenseMutation;
  const [updateTransaction, { isLoading }] = mutationHook();

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      
      // Format initial transaction date
      const initialTransactionDate = moment(initialTransaction?.date).format("YYYY-MM-DD");

      // Prepare updated form data
      let updatedFormData = {
        ...formData,
        date: moment(formData.date).format("YYYY-MM-DD"), // Format ISO 8601
      };

      // Check if data has changed
      const isDataChanged =
        JSON.stringify(updatedFormData) === JSON.stringify({ ...initialTransaction, date: initialTransactionDate });

      if (isDataChanged) {
        toast.error("No changes detected.");
        return;
      }

      dispatch(updateLoader(40));
      const res = await updateTransaction({
        _id,
        data: updatedFormData,
      }).unwrap();

      dispatch(updateLoader(60));
      await dispatch(setRefetch(true));
      await dispatch(closeModal());

      toast.success(
        res.message ||
          (type === "income"
            ? "Income updated successfully!"
            : "Expense updated successfully!")
      );
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || "Unexpected Internal Server Error!");
    } finally {
      await dispatch(setRefetch(false));
      dispatch(updateLoader(100));
    }
  };

  const setInitialData = async () => {
    if (initialTransaction) {
      setFormData({
        ...initialTransaction,
        date: moment(initialTransaction?.date).format("YYYY-MM-DD"), // Format ISO 8601
      });
      setMainTitle(initialTransaction?.title);
    }
  };

  useEffect(() => {
    setInitialData();
  }, [initialTransaction]);

  const hasErrors = Object.values(errors).some((error) => !!error);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal())}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex justify-center items-center">
            <h4 className="text-2xl tracking-relaxed capitalize">
              {isDisabled ? `${mainTitle} Overview` : `Update ${mainTitle}`}
            </h4>
          </ModalHeader>
          <ModalBody>
            <Input
              label="Title"
              name="title"
              placeholder="Enter the title"
              isDisabled={isDisabled}
              value={title}
              onChange={handleOnChange}
              isInvalid={!!errors.title}
              errorMessage={errors?.title}
              startContent={<Title />}
              className="text-gray-500"
            />
            <Input
              type="number"
              label="Amount"
              name="amount"
              placeholder="Enter the amount"
              isDisabled={isDisabled}
              value={amount}
              onChange={handleOnChange}
              isInvalid={!!errors.amount}
              errorMessage={errors?.amount}
              startContent={<Amount />}
              className="text-gray-500"
            />
            <div className="w-full flex gap-x-2">
              {isDisabled ? (
                <Input
                  type="text"
                  label="Category"
                  name="category"
                  isDisabled={isDisabled}
                  value={category}
                  onChange={handleOnChange}
                  startContent={<Category />}
                  className="text-gray-500"
                />
              ) : (
                <Select
                  name="category"
                  label="Category"
                  placeholder="Select the category"
                  selectedKeys={[category]}
                  onChange={handleOnChange}
                  isInvalid={!!errors.category}
                  errorMessage={errors?.category}
                  startContent={<Category />}
                  className="text-gray-500"
                >
                  {type === "income"
                    ? incomeCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))
                    : expenseCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                </Select>
              )}
              <DatePicker
                name="date"
                label="Date"
                placeholder="Enter your date"
                isDisabled={isDisabled}
                value={moment(transactionDate, "YYYY-MM-DD").toDate()}
                onChange={handleDateChange}
                errorMessage={errors?.date}
                className="text-gray-500"
              />
            </div>
            <Textarea
              label="Description"
              name="description"
              placeholder="Enter the description"
              isDisabled={isDisabled}
              value={description}
              onChange={handleOnChange}
              isInvalid={!!errors.description}
              errorMessage={errors?.description}
              startContent={<Edit />}
              className="text-gray-500"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              auto
              flat
              color="error"
              onClick={() => dispatch(closeModal())}
            >
              Cancel
            </Button>
            <Button
              auto
              onClick={handleUpdate}
              disabled={isLoading || hasErrors}
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default TransactionViewAndUpdateModal;
