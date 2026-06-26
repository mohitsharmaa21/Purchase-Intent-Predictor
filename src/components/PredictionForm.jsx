import React from 'react';
import { 
  MousePointer, TrendingUp, Cpu, Calendar, UserCheck, 
  HelpCircle, Sparkles, User, RotateCcw, Download, Upload 
} from 'lucide-react';

export default function PredictionForm({
  inputs,
  errors,
  onChange,
  onToggle,
  onSelectChange,
  onTrySample,
  onReset,
  onPredict,
  onExportInputs,
  onDownloadPrediction,
  isPredicting,
  hasResult,
  shakeForm
}) {
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onPredict();
  };

  return (
    <form 
      onSubmit={handleFormSubmit} 
      className={`form-cards-stack ${shakeForm ? 'animate-shake' : ''}`}
    >
      {/* CARD 1: Session Activity */}
      <div className="premium-card">
        <div className="card-header-group">
          <div className="card-icon-box">
            <MousePointer className="w-5 h-5" />
          </div>
          <h3 className="card-title">Session Activity</h3>
        </div>
        
        <div className="form-row-grid">
          <div className="input-field-container">
            <div className="input-label-row">
              <label className="input-label" htmlFor="Administrative">
                Administrative Pages
                <span className="input-tooltip-trigger" title="Number of pages related to account management, checkout steps, or customer service visited."><HelpCircle className="w-3.5 h-3.5" /></span>
              </label>
            </div>
            <div className={`input-wrapper ${errors.Administrative ? 'has-error' : ''}`}>
              <span className="input-icon-left"><MousePointer className="w-4 h-4" /></span>
              <input
                id="Administrative"
                name="Administrative"
                type="number"
                min="0"
                step="1"
                value={inputs.Administrative}
                onChange={onChange}
                className="premium-input"
                placeholder="e.g. 2"
              />
            </div>
            {errors.Administrative && <span className="input-error-msg">{errors.Administrative}</span>}
          </div>

          <div className="input-field-container">
            <div className="input-label-row">
              <label className="input-label" htmlFor="Administrative_Duration">
                Administrative Duration (s)
                <span className="input-tooltip-trigger" title="Total time in seconds spent viewing administrative pages."><HelpCircle className="w-3.5 h-3.5" /></span>
              </label>
            </div>
            <div className={`input-wrapper ${errors.Administrative_Duration ? 'has-error' : ''}`}>
              <span className="input-icon-left"><MousePointer className="w-4 h-4" /></span>
              <input
                id="Administrative_Duration"
                name="Administrative_Duration"
                type="number"
                min="0"
                step="any"
                value={inputs.Administrative_Duration}
                onChange={onChange}
                className="premium-input"
                placeholder="e.g. 60"
              />
            </div>
            {errors.Administrative_Duration && <span className="input-error-msg">{errors.Administrative_Duration}</span>}
          </div>

          <div className="input-field-container">
            <div className="input-label-row">
              <label className="input-label" htmlFor="Informational">
                Informational Pages
                <span className="input-tooltip-trigger" title="Number of informational pages (e.g. About Us, Contact, FAQ) visited in this session."><HelpCircle className="w-3.5 h-3.5" /></span>
              </label>
            </div>
            <div className={`input-wrapper ${errors.Informational ? 'has-error' : ''}`}>
              <span className="input-icon-left"><MousePointer className="w-4 h-4" /></span>
              <input
                id="Informational"
                name="Informational"
                type="number"
                min="0"
                step="1"
                value={inputs.Informational}
                onChange={onChange}
                className="premium-input"
                placeholder="e.g. 1"
              />
            </div>
            {errors.Informational && <span className="input-error-msg">{errors.Informational}</span>}
          </div>

          <div className="input-field-container">
            <div className="input-label-row">
              <label className="input-label" htmlFor="Informational_Duration">
                Informational Duration (s)
                <span className="input-tooltip-trigger" title="Total time in seconds spent viewing informational pages."><HelpCircle className="w-3.5 h-3.5" /></span>
              </label>
            </div>
            <div className={`input-wrapper ${errors.Informational_Duration ? 'has-error' : ''}`}>
              <span className="input-icon-left"><MousePointer className="w-4 h-4" /></span>
              <input
                id="Informational_Duration"
                name="Informational_Duration"
                type="number"
                min="0"
                step="any"
                value={inputs.Informational_Duration}
                onChange={onChange}
                className="premium-input"
                placeholder="e.g. 30"
              />
            </div>
            {errors.Informational_Duration && <span className="input-error-msg">{errors.Informational_Duration}</span>}
          </div>

          <div className="input-field-container">
            <div className="input-label-row">
              <label className="input-label" htmlFor="ProductRelated">
                Product Related Pages
                <span className="input-tooltip-trigger" title="Number of product description or category browsing pages visited in this session."><HelpCircle className="w-3.5 h-3.5" /></span>
              </label>
            </div>
            <div className={`input-wrapper ${errors.ProductRelated ? 'has-error' : ''}`}>
              <span className="input-icon-left"><MousePointer className="w-4 h-4" /></span>
              <input
                id="ProductRelated"
                name="ProductRelated"
                type="number"
                min="0"
                step="1"
                value={inputs.ProductRelated}
                onChange={onChange}
                className="premium-input"
                placeholder="e.g. 12"
              />
            </div>
            {errors.ProductRelated && <span className="input-error-msg">{errors.ProductRelated}</span>}
          </div>

          <div className="input-field-container">
            <div className="input-label-row">
              <label className="input-label" htmlFor="ProductRelated_Duration">
                Product Duration (s)
                <span className="input-tooltip-trigger" title="Total time in seconds spent viewing product-related pages. This is highly correlated with intention."><HelpCircle className="w-3.5 h-3.5" /></span>
              </label>
            </div>
            <div className={`input-wrapper ${errors.ProductRelated_Duration ? 'has-error' : ''}`}>
              <span className="input-icon-left"><MousePointer className="w-4 h-4" /></span>
              <input
                id="ProductRelated_Duration"
                name="ProductRelated_Duration"
                type="number"
                min="0"
                step="any"
                value={inputs.ProductRelated_Duration}
                onChange={onChange}
                className="premium-input"
                placeholder="e.g. 450"
              />
            </div>
            {errors.ProductRelated_Duration && <span className="input-error-msg">{errors.ProductRelated_Duration}</span>}
          </div>
        </div>
      </div>

      {/* CARD 2: Engagement Metrics */}
      <div className="premium-card">
        <div className="card-header-group">
          <div className="card-icon-box">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="card-title">Engagement Metrics</h3>
        </div>

        <div className="form-row-grid">
          <div className="input-field-container">
            <div className="input-label-row">
              <label className="input-label" htmlFor="BounceRates">
                Bounce Rate (%)
                <span className="input-tooltip-trigger" title="Percentage of visitors who enter the website and bounce immediately without triggering other requests."><HelpCircle className="w-3.5 h-3.5" /></span>
              </label>
            </div>
            <div className={`input-wrapper ${errors.BounceRates ? 'has-error' : ''}`}>
              <span className="input-icon-left"><TrendingUp className="w-4 h-4" /></span>
              <input
                id="BounceRates"
                name="BounceRates"
                type="number"
                min="0"
                max="100"
                step="any"
                value={inputs.BounceRates}
                onChange={onChange}
                className="premium-input"
                placeholder="e.g. 2.0"
              />
            </div>
            {errors.BounceRates && <span className="input-error-msg">{errors.BounceRates}</span>}
          </div>

          <div className="input-field-container">
            <div className="input-label-row">
              <label className="input-label" htmlFor="ExitRates">
                Exit Rate (%)
                <span className="input-tooltip-trigger" title="Percentage of pageviews on this page that were the final session exit page."><HelpCircle className="w-3.5 h-3.5" /></span>
              </label>
            </div>
            <div className={`input-wrapper ${errors.ExitRates ? 'has-error' : ''}`}>
              <span className="input-icon-left"><TrendingUp className="w-4 h-4" /></span>
              <input
                id="ExitRates"
                name="ExitRates"
                type="number"
                min="0"
                max="100"
                step="any"
                value={inputs.ExitRates}
                onChange={onChange}
                className="premium-input"
                placeholder="e.g. 5.0"
              />
            </div>
            {errors.ExitRates && <span className="input-error-msg">{errors.ExitRates}</span>}
          </div>

          <div className="input-field-container">
            <div className="input-label-row">
              <label className="input-label" htmlFor="PageValues">
                Page Value
                <span className="input-tooltip-trigger" title="Average value of pages viewed before completing an e-commerce transaction. Most important predictive feature."><HelpCircle className="w-3.5 h-3.5" /></span>
              </label>
            </div>
            <div className={`input-wrapper ${errors.PageValues ? 'has-error' : ''}`}>
              <span className="input-icon-left"><TrendingUp className="w-4 h-4" /></span>
              <input
                id="PageValues"
                name="PageValues"
                type="number"
                min="0"
                step="any"
                value={inputs.PageValues}
                onChange={onChange}
                className="premium-input"
                placeholder="e.g. 15.0"
              />
            </div>
            {errors.PageValues && <span className="input-error-msg">{errors.PageValues}</span>}
          </div>

          <div className="input-field-container">
            <div className="input-label-row">
              <label className="input-label" htmlFor="SpecialDay">
                Special Day Closeness
                <span className="input-tooltip-trigger" title="Closeness of session date to a special e-commerce day (0.0 to 1.0, e.g. Valentine's or Mother's Day)."><HelpCircle className="w-3.5 h-3.5" /></span>
              </label>
            </div>
            <div className={`input-wrapper ${errors.SpecialDay ? 'has-error' : ''}`}>
              <span className="input-icon-left"><TrendingUp className="w-4 h-4" /></span>
              <input
                id="SpecialDay"
                name="SpecialDay"
                type="number"
                min="0"
                max="1"
                step="any"
                value={inputs.SpecialDay}
                onChange={onChange}
                className="premium-input"
                placeholder="e.g. 0.0"
              />
            </div>
            <span className="helper-text">0 = Normal Day, 0.5 = Average Day, 1 = Special Day</span>
            {errors.SpecialDay && <span className="input-error-msg">{errors.SpecialDay}</span>}
          </div>
        </div>
      </div>

      {/* CARD 3: Technical Details */}
      <div className="premium-card">
        <div className="card-header-group">
          <div className="card-icon-box">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="card-title">Technical Details</h3>
        </div>

        <div className="form-row-grid">
          <div className="input-field-container">
            <div className="input-label-row">
              <label className="input-label" htmlFor="OperatingSystems">
                Operating System ID
                <span className="input-tooltip-trigger" title="Numerical code representing the operating system of the visitor."><HelpCircle className="w-3.5 h-3.5" /></span>
              </label>
            </div>
            <div className={`input-wrapper ${errors.OperatingSystems ? 'has-error' : ''}`}>
              <span className="input-icon-left"><Cpu className="w-4 h-4" /></span>
              <input
                id="OperatingSystems"
                name="OperatingSystems"
                type="number"
                min="1"
                step="1"
                value={inputs.OperatingSystems}
                onChange={onChange}
                className="premium-input"
                placeholder="e.g. 2"
              />
            </div>
            {errors.OperatingSystems && <span className="input-error-msg">{errors.OperatingSystems}</span>}
          </div>

          <div className="input-field-container">
            <div className="input-label-row">
              <label className="input-label" htmlFor="Browser">
                Browser ID
                <span className="input-tooltip-trigger" title="Numerical code representing the web browser used."><HelpCircle className="w-3.5 h-3.5" /></span>
              </label>
            </div>
            <div className={`input-wrapper ${errors.Browser ? 'has-error' : ''}`}>
              <span className="input-icon-left"><Cpu className="w-4 h-4" /></span>
              <input
                id="Browser"
                name="Browser"
                type="number"
                min="1"
                step="1"
                value={inputs.Browser}
                onChange={onChange}
                className="premium-input"
                placeholder="e.g. 2"
              />
            </div>
            {errors.Browser && <span className="input-error-msg">{errors.Browser}</span>}
          </div>

          <div className="input-field-container">
            <div className="input-label-row">
              <label className="input-label" htmlFor="Region">
                Region ID
                <span className="input-tooltip-trigger" title="Numerical code representing the geographic region of the shopper."><HelpCircle className="w-3.5 h-3.5" /></span>
              </label>
            </div>
            <div className={`input-wrapper ${errors.Region ? 'has-error' : ''}`}>
              <span className="input-icon-left"><Cpu className="w-4 h-4" /></span>
              <input
                id="Region"
                name="Region"
                type="number"
                min="1"
                step="1"
                value={inputs.Region}
                onChange={onChange}
                className="premium-input"
                placeholder="e.g. 1"
              />
            </div>
            {errors.Region && <span className="input-error-msg">{errors.Region}</span>}
          </div>

          <div className="input-field-container">
            <div className="input-label-row">
              <label className="input-label" htmlFor="TrafficType">
                Traffic Type ID
                <span className="input-tooltip-trigger" title="Numerical code representing the marketing channel or traffic source."><HelpCircle className="w-3.5 h-3.5" /></span>
              </label>
            </div>
            <div className={`input-wrapper ${errors.TrafficType ? 'has-error' : ''}`}>
              <span className="input-icon-left"><Cpu className="w-4 h-4" /></span>
              <input
                id="TrafficType"
                name="TrafficType"
                type="number"
                min="1"
                step="1"
                value={inputs.TrafficType}
                onChange={onChange}
                className="premium-input"
                placeholder="e.g. 2"
              />
            </div>
            {errors.TrafficType && <span className="input-error-msg">{errors.TrafficType}</span>}
          </div>

          <div className="input-field-container">
            <label className="input-label">
              Weekend Visit
              <span className="input-tooltip-trigger" title="Is the session on a weekend day (Saturday/Sunday)?"><HelpCircle className="w-3.5 h-3.5" /></span>
            </label>
            <div className="toggle-wrapper">
              <span className="text-secondary font-medium text-sm">
                {inputs.Weekend ? "Yes (Weekend Session)" : "No (Weekday Session)"}
              </span>
              <label className="switch">
                <input
                  type="checkbox"
                  name="Weekend"
                  checked={inputs.Weekend}
                  onChange={onToggle}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* CARDS 4 & 5: Month & Visitor Type Selection */}
      <div className="form-row-grid">
        {/* CARD 4: Month Selection */}
        <div className="premium-card" style={{ paddingBottom: '1.5rem' }}>
          <div className="card-header-group">
            <div className="card-icon-box">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="card-title">Month Selection</h3>
          </div>
          
          <div className="input-field-container">
            <label className="input-label" htmlFor="Month">
              Month of Session
              <span className="input-tooltip-trigger" title="Select the calendar month when this shopping session occurred."><HelpCircle className="w-3.5 h-3.5" /></span>
            </label>
            <div className="input-wrapper">
              <span className="input-icon-left"><Calendar className="w-4 h-4" /></span>
              <select
                id="Month"
                name="Month"
                value={inputs.Month}
                onChange={onSelectChange}
                className="premium-select"
              >
                <option value="Aug">August</option>
                <option value="Dec">December</option>
                <option value="Feb">February</option>
                <option value="Jul">July</option>
                <option value="June">June</option>
                <option value="Mar">March</option>
                <option value="May">May</option>
                <option value="Nov">November</option>
                <option value="Oct">October</option>
                <option value="Sep">September</option>
              </select>
            </div>
          </div>
        </div>

        {/* CARD 5: Visitor Type */}
        <div className="premium-card" style={{ paddingBottom: '1.5rem' }}>
          <div className="card-header-group">
            <div className="card-icon-box">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="card-title">Visitor Type</h3>
          </div>

          <div className="input-field-container">
            <label className="input-label" htmlFor="VisitorType">
              Shopper Cohort
              <span className="input-tooltip-trigger" title="Visitor segment: New customer, returning user, or other."><HelpCircle className="w-3.5 h-3.5" /></span>
            </label>
            <div className="input-wrapper">
              <span className="input-icon-left"><User className="w-4 h-4" /></span>
              <select
                id="VisitorType"
                name="VisitorType"
                value={inputs.VisitorType}
                onChange={onSelectChange}
                className="premium-select"
              >
                <option value="New Visitor">New Visitor</option>
                <option value="Returning Visitor">Returning Visitor</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Button Toolbars */}
      <div className="form-buttons-row">
        <button
          type="submit"
          disabled={isPredicting}
          className="btn btn-primary btn-ripple"
        >
          {isPredicting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Predicting...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Predict Purchase Intent
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onTrySample}
          disabled={isPredicting}
          className="btn btn-secondary"
          title="Fills the form with realistic standard dataset values"
        >
          <UserCheck className="w-4 h-4" />
          Try Sample Visitor
        </button>

        <button
          type="button"
          onClick={onReset}
          disabled={isPredicting}
          className="btn btn-secondary text-slate-500"
          title="Clear all fields"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>

        <button
          type="button"
          onClick={onExportInputs}
          className="btn btn-secondary"
          title="Export current inputs as JSON file"
        >
          <Upload className="w-4 h-4" />
          Export Inputs
        </button>

        <button
          type="button"
          onClick={onDownloadPrediction}
          disabled={!hasResult}
          className="btn btn-secondary"
          title="Download the latest predicted intent payload"
        >
          <Download className="w-4 h-4" />
          Download prediction
        </button>
      </div>
    </form>
  );
}
