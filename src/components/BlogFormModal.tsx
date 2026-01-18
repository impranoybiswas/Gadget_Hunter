"use client";

import React, { useEffect, useState } from "react";
import ControlledModal from "@/ui/ControlledModal";
import Button from "@/ui/Button";
import { Blog } from "@/types/blog";
import { useAddBlog, useUpdateBlog } from "@/hooks/useBlogs";
import { useUserData } from "@/hooks/useUserData";

interface BlogFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: Blog | null;
}

export default function BlogFormModal({ isOpen, onClose, editData }: BlogFormModalProps) {
  const { currentUser } = useUserData();
  const addBlog = useAddBlog();
  const updateBlog = useUpdateBlog();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title,
        content: editData.content,
      });
    } else {
      setFormData({ title: "", content: "" });
    }
  }, [editData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.email) return;

    if (editData) {
      updateBlog.mutate(
        { id: editData._id, ...formData },
        { onSuccess: onClose }
      );
    } else {
      addBlog.mutate(
        { ...formData, author: currentUser.email },
        { onSuccess: onClose }
      );
    }
  };

  const isPending = addBlog.isPending || updateBlog.isPending;

  return (
    <ControlledModal
      isOpen={isOpen}
      onClose={onClose}
      title={editData ? "Edit Tech Blog" : "Share a Tech Insight"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-base-content/80">
            Title
          </label>
          <input
            autoFocus
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="A catchy, technical title..."
            className="w-full p-3 rounded-xl border border-base-content/10 bg-base-200 focus:ring-2 focus:ring-primary outline-none transition-all text-base-content"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-base-content/80">
            Content
          </label>
          <textarea
            required
            rows={8}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Go deep into the details..."
            className="w-full p-3 rounded-xl border border-base-content/10 bg-base-200 focus:ring-2 focus:ring-primary outline-none transition-all resize-none text-base-content"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            label="Cancel"
            isOutline
            isLarge={false}
            onClick={onClose}
            disabled={isPending}
          />
          <Button
            type="submit"
            isOutline={false}
            isLarge={false}
            label={isPending ? "Saving..." : editData ? "Update Blog" : "Publish Blog"}
            disabled={isPending}
          />
        </div>
      </form>
    </ControlledModal>
  );
}
