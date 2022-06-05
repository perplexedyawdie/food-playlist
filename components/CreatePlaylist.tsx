import React from 'react'

const CreatePlaylist = () => {
    return (
        <>
            <input type="checkbox" id="create-playlist-modal" className="modal-toggle" />
            <label htmlFor="create-playlist-modal" className="modal cursor-pointer">
                <label htmlFor='' className="modal-box relative border-black bg-[#dbec79] rounded-none border-4 drop-shadow-[4px_4px_rgba(0,0,0,1)] text-black">
                <label htmlFor="create-playlist-modal" className="btn btn-sm btn-square bg-[#ff7d85] border-black rounded-none border-4 drop-shadow-[2px_2px_rgba(0,0,0,1)] absolute right-2 top-2 text-black hover:text-[#ff7d85]">✕</label>
                    <h3 className="font-bold text-lg mt-8">Congratulations random Interner user!</h3>
                    <p className="py-4">You&apos;ve been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn">Yay!</label>
                    </div>
                </label>
            </label>
        </>
    )
}

export default CreatePlaylist