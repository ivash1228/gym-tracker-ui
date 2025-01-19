import Button from '../Button';
import { BUTTON_VARIANTS } from '../../constants/constants';

// Модальное окно добавления сета
const AddSetModal = ({ isOpen, onClose, onAdd, newSet, setNewSet }) => {
    if (!isOpen) return null;
    
    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'var(--color-background)',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 1000,
            border: '1px solid var(--color-border)',
        }}>
            <h3>Add New Set</h3>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={newSet.weights}
                    onChange={(e) => setNewSet({ ...newSet, weights: e.target.value })}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="number"
                    placeholder="Reps"
                    value={newSet.reps}
                    onChange={(e) => setNewSet({ ...newSet, reps: e.target.value })}
                />
            </div>
            <div className="form-buttons">
                <Button 
                    onClick={onAdd}
                    variant={BUTTON_VARIANTS.ACTION}
                    fullWidth
                >
                    Add
                </Button>
                <Button 
                    onClick={() => {
                        onClose();
                        setNewSet({ weights: '', reps: '' });
                    }}
                    variant={BUTTON_VARIANTS.SECONDARY}
                    fullWidth
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default AddSetModal; 