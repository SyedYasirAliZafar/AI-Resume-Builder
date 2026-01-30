import { Folder, Plus, Trash2 } from "lucide-react";
import React from "react";

const ProjectForm = ({ data = [], onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };

    onChange([...(data || []), newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Projects
          </h3>
          <p className="text-sm text-gray-500">Add your projects</p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {(data || []).length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Folder className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No project added yet.</p>
          <p className="text-sm">Click "Add Project" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4 mt-6">
          {(data || []).map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4>Project #{index + 1}</h4>
                <button onClick={() => removeProject(index)}>
                  <Trash2 className="size-4 text-red-500" />
                </button>
              </div>

              <div className="grid gap-3">
                <input
                  type="text"
                  value={project.name || ""}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  placeholder="Project Name"
                  className="px-3 py-2 text-sm rounded-lg"
                />

                <input
                  type="text"
                  value={project.type || ""}
                  onChange={(e) => updateProject(index, "type", e.target.value)}
                  placeholder="Project Type"
                  className="px-3 py-2 text-sm rounded-lg"
                />

                <textarea
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  rows={4}
                  placeholder="Describe your project..."
                  className="px-3 py-2 text-sm rounded-lg w-full resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
