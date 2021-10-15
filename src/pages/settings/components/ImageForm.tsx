import { Dialog, Transition } from "@headlessui/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  profileImagePath: string;
};
export const ImageForm: React.VFC<Props> = (props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | File>(null);
  const [imagePrevewSrc, setImagePreviewSrc] = useState("");

  useEffect(() => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePreviewSrc(fileReader.result ? fileReader.result.toString() : "");
    };
    selectedImage && fileReader.readAsDataURL(selectedImage);
  }, [selectedImage]);

  const handleOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);
  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const handleChangeImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleOpenModal();
    setSelectedImage(e.currentTarget.files ? e.currentTarget.files[0] : null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 画像のアップロード関数
  const handleUploadProfileImage = useCallback(async () => {
    const toastId = toast.loading("アップロード中");
    try {
      toast.success("プロフィール画像を変更しました", { id: toastId });
    } catch (error) {
      toast.error("画像のアップロードに失敗しました", { id: toastId });
      console.error(error);
    }

    return;
  }, []);

  return (
    <div className="w-1/3">
      <form className="block">
        <label className="block">
          <input type="file" className="hidden" onChange={handleChangeImage} />
          <img
            src={props.profileImagePath}
            className="block overflow-hidden mx-auto rounded-full cursor-pointer"
            alt="Profile"
          />
          <span className="block mt-2 text-sm text-center text-gray-600 cursor-pointer">
            変更する
          </span>
        </label>
      </form>
      <Transition appear show={isOpenModal} as="div">
        <Dialog
          as="div"
          className="overflow-y-auto fixed inset-0 z-10 bg-gray-400 bg-opacity-40"
          onClose={handleCloseModal}
        >
          <div className="flex justify-center items-center px-4 min-h-screen">
            <Transition.Child
              as="div"
              enter="ease-out duration-50"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-50"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as="div"
              enter="ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-50"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="overflow-hidden p-6 m-auto w-80 sm:w-96 bg-white rounded-lg shadow-xl transition-all transform">
                <Dialog.Title as="h3" className="text-2xl font-bold text-center text-gray-900">
                  プロフィール画像を変更
                </Dialog.Title>

                <img
                  src={imagePrevewSrc}
                  alt=""
                  className="block object-cover overflow-hidden my-4 mx-auto w-32 h-32 rounded-full"
                />

                <button
                  onClick={handleUploadProfileImage}
                  className="block py-2 px-8 mx-auto rounded-sm border"
                >
                  更新する
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
