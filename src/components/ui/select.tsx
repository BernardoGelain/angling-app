import { useState, useCallback, useContext, useEffect, createContext, ReactNode, isValidElement } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { cn } from '../../lib/utils';

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  children: ReactNode;
  className?: string;
}

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  labels: Map<string, string>;
  setLabel: (value: string, label: string) => void;
}

const SelectContext = createContext<SelectContextValue>({
  open: false,
  setOpen: () => {},
  labels: new Map(),
  setLabel: () => {},
});

function Select({ value, onValueChange, placeholder, children, className }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [labels, setLabels] = useState<Map<string, string>>(new Map());

  const setLabel = useCallback((value: string, label: string) => {
    setLabels((prev) => {
      const newMap = new Map(prev);
      newMap.set(value, label);
      return newMap;
    });
  }, []);

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen, labels, setLabel }}>
      <View className={cn('relative', className)}>
        {children}
      </View>
    </SelectContext.Provider>
  );
}

function SelectTrigger({ className, children }: { className?: string; children?: ReactNode }) {
  const { value, open, setOpen, labels } = useContext(SelectContext);

  return (
    <TouchableOpacity
      onPress={() => setOpen(!open)}
      className={cn(
        'flex-row items-center justify-between h-10 w-full rounded-md border border-input bg-background px-3',
        className
      )}
      style={{ minHeight: 40 }}
      activeOpacity={0.7}
    >
      <View className="flex-1" style={{ justifyContent: 'center' }}>
        {children || (
          <Text className={value ? 'text-foreground' : 'text-muted-foreground'}>
            {value ? (labels.get(value) || value) : 'Select...'}
          </Text>
        )}
      </View>
      <View style={{ marginLeft: 8 }}>
        <ChevronDown size={16} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  );
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value, labels } = useContext(SelectContext);
  return (
    <Text className={value ? 'text-foreground' : 'text-muted-foreground'}>
      {value ? (labels.get(value) || value) : (placeholder || 'Select...')}
    </Text>
  );
}

function SelectContent({ children }: { children: ReactNode }) {
  const { open, setOpen } = useContext(SelectContext);

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => setOpen(false)}
    >
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        activeOpacity={1}
        onPress={() => setOpen(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            className="bg-card rounded-lg border border-border max-h-[80%]"
          >
            <ScrollView className="max-h-[400px]">
              {children}
            </ScrollView>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

function SelectItem({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const { value: selectedValue, onValueChange, setOpen, setLabel } = useContext(SelectContext);

  useEffect(() => {
    // Extract text from children
    let labelText = '';
    if (typeof children === 'string') {
      labelText = children;
    } else if (isValidElement(children)) {
      const props = children.props as { children?: string };
      if (typeof props.children === 'string') {
        labelText = props.children;
      }
    }
    if (labelText) {
      setLabel(value, labelText);
    }
  }, [value, children, setLabel]);

  const handlePress = () => {
    onValueChange?.(value);
    setOpen(false);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={cn(
        'px-4 py-3 border-b border-border',
        selectedValue === value && 'bg-muted',
        className
      )}
      activeOpacity={0.7}
    >
      <Text className={selectedValue === value ? 'font-medium text-foreground' : 'text-foreground'}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
