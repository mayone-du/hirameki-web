import { Dialog, Transition } from "@headlessui/react";
import React, { useCallback, useState } from "react";

type Props = {
  profileImagePath: string;
};
export const ImageForm: React.VFC<Props> = (props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | File>(null);
  // 認証モーダルの開閉
  const handleOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);
  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const handleChangeImage = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOpenModal();
    console.log(e);

    // selectedImage(e.target.files[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 画像のアップロード関数
  const handleUploadProfileImage = useCallback(async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    return;
  }, []);

  return (
    <div className="w-1/3">
      <form className="block" onSubmit={handleUploadProfileImage}>
        <label className="block">
          <input type="file" className="hidden" onChange={handleChangeImage} />
          <img
            src={props.profileImagePath}
            className="block overflow-hidden mx-auto rounded-full cursor-pointer"
            alt="Profile"
          />
          <button className="block mx-auto mt-2 text-sm text-gray-600">変更する</button>
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
              <div className="p-6 w-80 bg-white rounded">
                <Dialog.Title as="h3" className="text-2xl font-bold text-center text-gray-900">
                  プロフィール画像を変更
                </Dialog.Title>

                <img
                  src=""
                  alt=""
                  className="block object-cover overflow-hidden my-4 mx-auto w-20 h-20 rounded-full"
                />

                <button className="block py-2 px-8 mx-auto rounded-sm border">更新する</button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
