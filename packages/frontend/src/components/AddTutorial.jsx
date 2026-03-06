import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TutorialDataService from "../services/TutorialService";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';
import { Chips } from 'primereact/chips';
import ActionButtons from "./common/ActionButtons";

const AddTutorial = () => {
  const navigate = useNavigate();
  const toast = useRef(null);

  const initialTutorialState = {
    title: "",
    description: "",
    category: "",
    published: false,
    author: "",
    readTime: 10,
    difficulty: "beginner",
    tags: "",
    imageUrl: ""
  };

  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [processing, setProcessing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tagArray, setTagArray] = useState([]);

  const difficultyOptions = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' }
  ];

  useEffect(() => {

    // Set New Relic page view name
    if (window.newrelic) {
      window.newrelic.setPageViewName('add-tutorial');
      window.newrelic.addPageAction('page_loaded', {
        component: 'AddTutorial',
        timestamp: new Date().toISOString()
      });
    }

    loadCategories();

    return () => {
      /* Commenting out page actions
      // Clean up or send final metrics when component unmounts
      if (window.newrelic) {
        window.newrelic.addPageAction('page_exited', {
          component: 'AddTutorial',
          duration_seconds: (Date.now() - performance.now()) / 1000
        });
      }
      */
    };
  }, []);

  const loadCategories = async () => {
    /* Commenting out action trace
    // Start a New Relic custom trace segment
    let actionTrace;
    if (window.newrelic) {
      actionTrace = window.newrelic.interaction();
      actionTrace.setName('load-categories');
      actionTrace.setAttribute('component', 'AddTutorial');
    }
    */

    try {
      const response = await TutorialDataService.getCategories();
      setCategories(response);

      /* Commenting out custom spans and traces
      if (window.newrelic) {
        window.newrelic.addToTrace({
          name: 'categories_loaded',
          type: 'data_fetch',
          start: startTime,
          end: endTime,
          metric: 'api.categories.duration',
          statusCode: 200,
          categories_count: response.length
        });
        
        // Complete the interaction
        if (actionTrace) {
          actionTrace.setAttribute('duration_ms', endTime - startTime);
          actionTrace.setAttribute('categories_count', response.length);
          actionTrace.save();
        }
      }
      */
    } catch (error) {
      /* Commenting out error tracking
      if (window.newrelic) {
        window.newrelic.addToTrace({
          name: 'categories_load_failed',
          type: 'data_fetch',
          start: startTime,
          end: endTime,
          metric: 'api.categories.failed',
          statusCode: error.response?.status || 500,
          error_message: error.message
        });
        
        window.newrelic.noticeError(error, {
          component: 'AddTutorial',
          action: 'loadCategories'
        });
        
        // Complete the interaction
        if (actionTrace) {
          actionTrace.setAttribute('error', error.message);
          actionTrace.setAttribute('duration_ms', endTime - startTime);
          actionTrace.save();
        }
      }
      */

      console.error("Error loading categories:", error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load categories',
        life: 3000
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });

    /* Commenting out page actions
    // Track significant field changes
    if (name === 'title' || name === 'description') {
      if (window.newrelic && value.length > 0) {
        window.newrelic.addPageAction('field_updated', {
          field_name: name,
          character_count: value.length,
          timestamp: new Date().toISOString()
        });
      }
    }
    */
  };

  const handleNumberChange = (name, value) => {
    setTutorial({ ...tutorial, [name]: value });

    /* Commenting out page actions
    if (window.newrelic) {
      window.newrelic.addPageAction('field_updated', {
        field_name: name,
        value: value,
        timestamp: new Date().toISOString()
      });
    }
    */
  };

  const onCategoryChange = (event) => {
    setSelectedCategory(event.value);
    setTutorial({ ...tutorial, 'category': event.value.id });

    /* Commenting out page actions
    if (window.newrelic) {
      window.newrelic.addPageAction('category_selected', {
        category_id: event.value.id,
        category_name: event.value.category,
        timestamp: new Date().toISOString()
      });
    }
    */
  };

  const onDifficultyChange = (event) => {
    setTutorial({ ...tutorial, 'difficulty': event.value });

    /* Commenting out page actions
    if (window.newrelic) {
      window.newrelic.addPageAction('difficulty_selected', {
        difficulty: event.value,
        timestamp: new Date().toISOString()
      });
    }
    */
  };

  const onTagsChange = (tags) => {
    setTagArray(tags);
    setTutorial({ ...tutorial, 'tags': tags.join(',') });

    /* Commenting out page actions
    if (window.newrelic) {
      window.newrelic.addPageAction('tags_updated', {
        tags_count: tags.length,
        tags: tags.join(','),
        timestamp: new Date().toISOString()
      });
    }
    */
  };

  const handleCancel = () => {
    /* Commenting out page actions
    if (window.newrelic) {
      window.newrelic.addPageAction('cancel_tutorial_creation', {
        data_entered: Object.values(tutorial).some(value => value !== initialTutorialState[value]),
        timestamp: new Date().toISOString()
      });
    }
    */

    navigate("/tutorials");
  };

  const saveTutorial = () => {
    if (!tutorial.title) {
      toast.current.show({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Title is required',
        life: 3000
      });

      /* Commenting out page actions
      if (window.newrelic) {
        window.newrelic.addPageAction('validation_error', {
          field: 'title',
          error: 'required',
          timestamp: new Date().toISOString()
        });
      }
      */

      return;
    }

    setProcessing(true);

    // Start a New Relic custom trace segment for tutorial creation
    // uncomment this for custom instrumentation
    /* let actionTrace;
    if (window.newrelic) {
      actionTrace = window.newrelic.interaction();
      actionTrace.setName('create-tutorial');
      actionTrace.setAttribute('tutorial_title_custom', tutorial.title);
      
      window.newrelic.addPageAction('tutorial_create_started_custom', {
        tutorial_title: tutorial.title,
        category_id: tutorial.category,
        difficulty: tutorial.difficulty,
        has_image: !!tutorial.imageUrl,
        tags_count: tagArray.length,
        timestamp: new Date().toISOString()
      });
    } */ // uncomment this for custom instrumentation

    const data = {
      title: tutorial.title,
      description: tutorial.description,
      category: tutorial.category,
      author: tutorial.author,
      readTime: tutorial.readTime,
      difficulty: tutorial.difficulty,
      tags: tutorial.tags,
      imageUrl: tutorial.imageUrl,
      published: false
    };

    const startTime = performance.now();

    TutorialDataService.create(data)
      .then((response) => {
        const endTime = performance.now();
        // uncomment this for custom instrumentation
        /*
        if (window.newrelic) {
          window.newrelic.addToTrace({
            name: 'tutorial_created_custom',
            type: 'tutorial',
            start: startTime,
            end: endTime,
            metric: 'api.tutorial.create.duration',
            statusCode: 201,
            tutorial_id: response.data.id
          });
          
          window.newrelic.addPageAction('tutorial_created_custom', {
            tutorial_id: response.data.id,
            tutorial_title: tutorial.title,
            processing_time_ms: endTime - startTime,
            timestamp: new Date().toISOString()
          });
          
          // Complete the interaction
          if (actionTrace) {
            actionTrace.setAttribute('duration_ms_custom', endTime - startTime);
            actionTrace.setAttribute('tutorial_id_custom', response.data.id);
            actionTrace.setAttribute('success_custom', true);
            actionTrace.save();
          }
        } */ // uncomment this for custom instrumentation

        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Tutorial created successfully',
          life: 3000
        });

        // Navigate to the edit page for the new tutorial
        navigate(`/tutorials/${response.data.id}`);
      })
      .catch((error) => {
        const endTime = performance.now();
        // uncomment this for custom instrumentation
        /*
        if (window.newrelic) {
          window.newrelic.addToTrace({
            name: 'tutorial_creation_failed_custom',
            type: 'tutorial',
            start: startTime,
            end: endTime,
            metric: 'api.tutorial.create.failed',
            statusCode: error.response?.status || 500,
            error_message: error.message
          });
          
          window.newrelic.noticeError(error, {
            action: 'create_tutorial_custom',
            tutorial_title: tutorial.title
          });
          
          window.newrelic.addPageAction('tutorial_creation_failed_custom', {
            tutorial_title: tutorial.title,
            error: error.message,
            timestamp: new Date().toISOString()
          });
          
          // Complete the interaction
          if (actionTrace) {
            actionTrace.setAttribute('error', error.message);
            actionTrace.setAttribute('duration_ms', endTime - startTime);
            actionTrace.setAttribute('success', false);
            actionTrace.save();
          }
        } */ // uncomment this for custom instrumentation

        console.error("Error creating tutorial:", error);

        toast.current.show({
          severity: 'error',
          summary: 'Creation Failed',
          detail: 'Failed to create tutorial',
          life: 3000
        });

        setProcessing(false);
      });
  };

  return (
    <div className="add-tutorial p-3">
      <Toast ref={toast} position="bottom-right" />

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
        <h2>Add New Tutorial</h2>
        <div className="mt-3 mt-md-0">
          <ActionButtons
            onCancel={handleCancel}
            onSave={saveTutorial}
            saveLabel="Create Tutorial"
            cancelLabel="Back to List"
            saveDisabled={processing}
            processing={processing}
          />
        </div>
      </div>

      <div className="card shadow-sm mb-4 border-0 p-4">
        <div className="row">
          <div className="col-md-8 pr-md-5">
            <div className="mb-4">
              <label htmlFor="title" className="form-label text-secondary font-weight-bold">Title</label>
              <InputText
                id="title"
                name="title"
                value={tutorial.title}
                onChange={handleInputChange}
                className="w-100 p-inputtext-lg"
                placeholder="E.g., Getting Started with React Hooks for Beginners"
                required
              />
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <div>
                  <label htmlFor="category" className="form-label text-secondary font-weight-bold">Category</label>
                  <Dropdown
                    id="category"
                    value={selectedCategory}
                    options={categories}
                    onChange={onCategoryChange}
                    optionLabel="category"
                    placeholder="Select a category"
                    className="w-100"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div>
                  <label htmlFor="author" className="form-label text-secondary font-weight-bold">Author</label>
                  <InputText
                    id="author"
                    name="author"
                    value={tutorial.author || ''}
                    onChange={handleInputChange}
                    className="w-100"
                    placeholder="E.g., John Smith"
                  />
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <div>
                  <label htmlFor="difficulty" className="form-label text-secondary font-weight-bold">Difficulty Level</label>
                  <Dropdown
                    id="difficulty"
                    value={tutorial.difficulty}
                    options={difficultyOptions}
                    onChange={onDifficultyChange}
                    placeholder="Select difficulty"
                    className="w-100"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div>
                  <label htmlFor="readTime" className="form-label text-secondary font-weight-bold">Read Time (minutes)</label>
                  <InputNumber
                    id="readTime"
                    value={tutorial.readTime}
                    onValueChange={(e) => handleNumberChange('readTime', e.value)}
                    min={1}
                    placeholder="E.g., 10"
                    className="w-100"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="imageUrl" className="form-label text-secondary font-weight-bold">Image URL</label>
              <InputText
                id="imageUrl"
                name="imageUrl"
                value={tutorial.imageUrl || ''}
                onChange={handleInputChange}
                className="w-100"
                placeholder="E.g., https://example.com/images/tutorial-banner.jpg"
              />
              {tutorial.imageUrl && (
                <div className="mt-3 text-center bg-dark p-2 rounded" style={{ border: '1px dashed var(--nr-border)' }}>
                  <img
                    src={tutorial.imageUrl}
                    alt="Tutorial preview"
                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
                    className="rounded shadow-sm"
                  />
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="tags" className="form-label text-secondary font-weight-bold">Tags</label>
              <Chips
                id="tags"
                value={tagArray}
                onChange={(e) => onTagsChange(e.value)}
                separator=","
                className="w-100"
                placeholder="Add tags like 'javascript', 'react', 'frontend' and press Enter"
              />
              <small className="text-muted mt-1 d-block"><i className="pi pi-info-circle mr-1"></i>Press Enter after each tag</small>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="form-label text-secondary font-weight-bold">Description</label>
              <InputTextarea
                id="description"
                name="description"
                value={tutorial.description}
                onChange={handleInputChange}
                rows={6}
                className="w-100"
                autoResize
                placeholder="Provide a detailed description of your tutorial. Include what readers will learn, prerequisites, and why this tutorial is valuable. You can use paragraphs to organize your content."
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm" style={{ backgroundColor: 'var(--nr-surface-hover)' }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <i className="pi pi-compass text-primary mr-2" style={{ fontSize: '1.5rem' }}></i>
                  <h5 className="card-title m-0 font-weight-bold text-white">Guidelines</h5>
                </div>
                <hr className="border-secondary opacity-25" />
                <ul className="pl-3 mt-4" style={{ color: 'var(--nr-text-secondary)', lineHeight: '1.8' }}>
                  <li className="mb-2">Choose a <span className="text-white">clear, descriptive title</span></li>
                  <li className="mb-2">Select the most <span className="text-white">appropriate category</span></li>
                  <li className="mb-2">Set an accurate <span className="text-white">difficulty level</span></li>
                  <li className="mb-2">Estimate <span className="text-white">realistic reading time</span></li>
                  <li className="mb-2">Use relevant tags to <span className="text-white">improve discoverability</span></li>
                  <li className="mb-2">Add an image to make your tutorial <span className="text-white">visually appealing</span></li>
                  <li className="mb-2">Write a <span className="text-white">comprehensive description</span></li>
                </ul>
                <div className="mt-4 p-3 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderLeft: '3px solid var(--nr-primary)' }}>
                  <p className="m-0 small text-muted">
                    After creation, you&apos;ll be redirected to the edit page where you can make further changes and publish the tutorial when ready.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTutorial;
