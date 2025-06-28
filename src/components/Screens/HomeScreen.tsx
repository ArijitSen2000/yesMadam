import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ALL_PRODUCTS } from "../../uritlity/productsData";
import { logout } from "../../redux/authSlice";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'single' | 'double'>('single');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const headerAnim = useRef(new Animated.Value(0)).current;

  const ITEM_PER_PAGE = 6;

  useEffect(() => {
    loadMore();
  }, []);

  const loadMore = () => {
    if (isLoading || products.length >= ALL_PRODUCTS.length) return;
    setIsLoading(true);
    setTimeout(() => {
      const nextItems = ALL_PRODUCTS.slice((page - 1) * ITEM_PER_PAGE, page * ITEM_PER_PAGE);
      setProducts(prev => [...prev, ...nextItems]);
      setPage(prev => prev + 1);
      setIsLoading(false);
    }, 500);
  };

  const onScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    Animated.timing(headerAnim, {
      toValue: offsetY > 50 ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleSelection = (item: any) => {
    const exists = selectedItems.find(i => i.id === item.id);
    if (exists) {
      setSelectedItems(prev => prev.filter(i => i.id !== item.id));
    } else {
      setSelectedItems(prev => [...prev, item]);
    }
  };

  const toggleViewMode = () => {
    setViewMode(prev => (prev === 'single' ? 'double' : 'single'));
  };

  const total = selectedItems.reduce((acc, item) => acc + item.price, 0);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => toggleSelection(item)}
      style={[
        styles.itemContainer,
        viewMode === 'double' ? styles.doubleColumnItem : styles.singleColumnItem,
        selectedItems.find(i => i.id === item.id) && styles.selectedItem
      ]}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="contain"
          onError={() => console.warn('Image failed to load:', item.image)}
        />
        <View style={styles.productInfo}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
          <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const headerTranslateY = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-80, 0],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
        <TouchableOpacity onPress={() => dispatch(logout())} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <TouchableOpacity onPress={toggleViewMode} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>
            {viewMode === 'single' ? 'Grid' : 'List'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <FlatList
        data={products}
        renderItem={renderItem}
        key={viewMode}
        keyExtractor={(item: any) => `product-${item.id}-${viewMode}`}
        numColumns={viewMode === 'double' ? 2 : 1}
        onScroll={onScroll}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#6200ee" />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.loadMoreButton}
              onPress={loadMore}
              disabled={products.length >= ALL_PRODUCTS.length}
            >
              <Text style={styles.loadMoreText}>
                {products.length >= ALL_PRODUCTS.length ? 'All products loaded' : 'Load More'}
              </Text>
            </TouchableOpacity>
          )
        }
      />

      {selectedItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: ₹{total.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.viewAllButtonText}>View Selected ({selectedItems.length})</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selected Items</Text>
            <FlatList
              data={selectedItems}
              keyExtractor={(item: any) => `selected-${item.id}`}
              renderItem={({ item }) => (
                <View style={styles.modalItem}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                  <View style={styles.modalItemText}>
                    <Text style={styles.modalItemTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.modalItemPrice}>₹{item.price.toFixed(2)}</Text>
                  </View>
                </View>
              )}
              ListFooterComponent={
                <View style={styles.modalTotal}>
                  <Text style={styles.modalTotalText}>Total: ₹{total.toFixed(2)}</Text>
                </View>
              }
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: verticalScale(100),
    backgroundColor: '#6200ee',
    paddingHorizontal: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: verticalScale(40),
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#fff',
  },
  headerButton: {
    padding: scale(8),
    borderRadius: scale(4),
    backgroundColor: 'rgba(255,255,255,0.2)',
    minWidth: scale(60),
    alignItems: 'center',
  },
  headerButtonText: {
    color: '#fff',
    fontSize: moderateScale(14),
  },
  listContent: {
    paddingTop: verticalScale(70),
    paddingBottom: verticalScale(20),
    paddingHorizontal: scale(8),
  },
  itemContainer: {
    padding: scale(5),
  },
  singleColumnItem: {
    width: '100%',
  },
  doubleColumnItem: {
    width: '50%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: scale(8),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 2,
    height: verticalScale(300),
  },
  productImage: {
    width: '100%',
    height: verticalScale(150),
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    padding: scale(10),
  },
  title: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  price: {
    fontSize: moderateScale(14),
    color: '#6200ee',
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  description: {
    fontSize: moderateScale(12),
    color: '#666',
  },
  selectedItem: {
    backgroundColor: '#e3f2fd',
  },
  footer: {
    padding: scale(12),
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  viewAllButton: {
    backgroundColor: '#6200ee',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12),
    borderRadius: scale(4),
  },
  viewAllButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: scale(15),
    borderRadius: scale(10),
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(15),
    textAlign: 'center',
  },
  modalItem: {
    padding: scale(10),
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalImage: {
    width: scale(50),
    height: scale(50),
    marginRight: scale(10),
  },
  modalItemText: {
    flex: 1,
  },
  modalItemTitle: {
    fontSize: moderateScale(14),
  },
  modalItemPrice: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#6200ee',
  },
  modalTotal: {
    padding: scale(10),
    borderTopWidth: 1,
    borderColor: '#eee',
    marginTop: verticalScale(10),
  },
  modalTotalText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    textAlign: 'right',
  },
  closeButton: {
    backgroundColor: '#6200ee',
    padding: scale(12),
    borderRadius: scale(4),
    marginTop: verticalScale(10),
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loadingContainer: {
    padding: scale(20),
    alignItems: 'center',
  },
  loadMoreButton: {
    backgroundColor: '#6200ee',
    padding: scale(12),
    borderRadius: scale(4),
    margin: scale(15),
    alignItems: 'center',
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
});

